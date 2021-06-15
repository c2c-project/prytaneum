import { createProxyMiddleware } from 'http-proxy-middleware';
import express from 'express';

const app = express();

// graphql server
app.use(
    '/graphql',
    createProxyMiddleware({
        changeOrigin: true,
        ws: true,
        target: `http://${process.env.HOST}:${process.env.SERVER_PORT}`,
        logLevel: 'debug',
    })
);

// frontend
app.use(
    '/',
    createProxyMiddleware({
        changeOrigin: true,
        target: `http://${process.env.HOST}:${process.env.CLIENT_PORT}`,
        logLevel: 'debug',
    })
);

app.listen(8080);
