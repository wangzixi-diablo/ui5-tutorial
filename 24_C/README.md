# Northwind OData Products (Top 10) - Vue 3 + Vite 示例

一个最小示例：获取 Northwind OData 服务前 10 条产品并显示在表格。

## CORS 说明
浏览器直接访问 `https://services.odata.org/...` 会因缺少 `Access-Control-Allow-Origin` 被拦截。所以在开发环境通过 **Vite dev server 代理**：

前端请求 `/api/products` -> Vite 代理到 `https://services.odata.org/V2/Northwind/Northwind.svc/Products?$top=10&$format=json` 并返回结果。

生产部署若仍需直接访问，可：
1. 在你的后端/网关再做一次反向代理；或
2. 使用 Serverless / Cloudflare Worker 中转；
3. (不推荐) 找支持 CORS 的镜像源。

## 启动

```powershell
npm install
npm run dev
```

浏览器打开输出的本地地址 (默认 http://localhost:5173)。首次修改 `vite.config.js` 后需重启 `npm run dev`。

## 说明
- 使用 `axios` 请求，headers 指定 `Accept: application/json`。
- OData V2 JSON 响应为 `{ d: [ {ProductID,...}, ...] }`。
- 组件存放于 `src/components/ProductTable.vue`。

## 构建
```powershell
npm run build
npm run preview
```
