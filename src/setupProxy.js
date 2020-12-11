/* eslint-disable */
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:3001',
            changeOrigin: true,
        })
    );
    app.use(
        createProxyMiddleware('/socket.io', {
            target: 'http://localhost:3001',
            changeOrigin: true,
            logLevel: 'debug',
            ws: true,
        })
    );
};
