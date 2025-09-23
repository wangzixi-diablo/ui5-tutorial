"""Simple script: 获取 Northwind OData 服务前 10 条 Products 数据并打印。

无需第三方依赖，使用标准库 urllib.request。 

API 说明:
  基础地址: https://services.odata.org/V2/Northwind/Northwind.svc/
  资源: Products
  查询参数: $top=10 取前十条; $format=json 返回 JSON (OData V2 默认是 XML, 需指定 JSON)

运行方式:
  python test-product.py            # 默认取前 10 条
  python test-product.py 5          # 取前 5 条
"""

from __future__ import annotations

import json
import sys
import urllib.error
import urllib.parse
import urllib.request
from dataclasses import dataclass
from typing import List, Any, Dict


BASE_URL = "https://services.odata.org/V2/Northwind/Northwind.svc/"
PRODUCTS_PATH = "Products"


@dataclass
class Product:
	ProductID: int
	ProductName: str
	QuantityPerUnit: str | None = None
	UnitPrice: float | None = None
	UnitsInStock: int | None = None
	Discontinued: bool | None = None

	@staticmethod
	def from_raw(raw: Dict[str, Any]) -> "Product":
		return Product(
			ProductID=raw.get("ProductID"),
			ProductName=raw.get("ProductName"),
			QuantityPerUnit=raw.get("QuantityPerUnit"),
			UnitPrice=raw.get("UnitPrice"),
			UnitsInStock=raw.get("UnitsInStock"),
			Discontinued=raw.get("Discontinued"),
		)


def build_products_url(top: int) -> str:
	query = urllib.parse.urlencode({"$top": top, "$format": "json"})
	return urllib.parse.urljoin(BASE_URL, f"{PRODUCTS_PATH}?{query}")


def fetch_products(top: int = 10, timeout: float = 10.0) -> List[Product]:
	"""获取前 top 条产品数据。

	Raises:
		RuntimeError: 网络或解析错误
	"""
	if top <= 0:
		return []
	url = build_products_url(top)
	try:
		req = urllib.request.Request(url, headers={"Accept": "application/json"})
		with urllib.request.urlopen(req, timeout=timeout) as resp:
			if resp.status != 200:
				raise RuntimeError(f"HTTP {resp.status}: {resp.reason}")
			raw_text = resp.read().decode("utf-8")
	except urllib.error.URLError as e:
		raise RuntimeError(f"请求失败: {e}") from e

	try:
		payload = json.loads(raw_text)
		# OData V2 JSON 结构: { "d": [ {...}, ... ] }
		products = payload.get("d", [])
		if not isinstance(products, list):
			raise RuntimeError("返回的 'd' 字段不是数组")
		return products
	except (ValueError, TypeError) as e:
		raise RuntimeError(f"解析 JSON 失败: {e}") from e

def print_products(products: List[Product]) -> None:
	if not products:
		print("无产品数据。")
		return
	for idx, p in enumerate(products, 1):
		print(f"Product #{idx}:")
		for k, v in p.items():
			print(f"  {k}: {v}")
		print("-")


def main(argv: List[str]) -> int:
	try:
		top = int(argv[1]) if len(argv) > 1 else 10
	except ValueError:
		print("参数必须是整数: 例如 python test-product.py 10")
		return 2

	try:
		products = fetch_products(top)
	except RuntimeError as e:
		print(f"获取产品失败: {e}")
		return 1

	print_products(products)
	return 0


if __name__ == "__main__":  # pragma: no cover
	sys.exit(main(sys.argv))

