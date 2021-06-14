import { createProxyMiddleware } from 'http-proxy-middleware';
import * as express from 'express';

const app = express();

// graphql server
app.use(
    '/graphql',
    createProxyMiddleware({
        changeOrigin: true,
        ws: true,
        target: 'http://localhost:3002',
        logLevel: 'debug',
    })
);

// frontend
app.use(
    '/',
    createProxyMiddleware({
        changeOrigin: true,
        target: 'http://localhost:3000',
        logLevel: 'debug',
    })
);

app.listen(8080);
