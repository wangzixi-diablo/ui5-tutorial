import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// 通过 devServer 代理解决浏览器直接请求 https://services.odata.org 出现的 CORS 限制
// 前端只请求 /api/products 即可。
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      // 固定返回 top=10 的产品数据
      '/api/products': {
        target: 'https://services.odata.org/V2/Northwind/Northwind.svc',
        changeOrigin: true,
        // 将 /api/products 重写为 /Products?... 查询
        rewrite: () => '/Products?$top=10&$format=json',
        configure: (proxy) => {
          // 可选：监听代理错误方便调试
          proxy.on('error', (err, _req, _res) => {
            console.error('[proxy error]', err);
          });
        }
      }
    }
  }
});
