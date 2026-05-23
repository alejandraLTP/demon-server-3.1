"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSSENotification = exports.maintainSSEConnection = void 0;
const sseConnections = [];
const maintainSSEConnection = (res) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    console.info("Cliente conectado a SSE");
    res.write(`data: ${JSON.stringify({ message: "Conexión SSE establecida" })}\n\n`);
    sseConnections.push(res);
    res.on("close", () => {
        console.info("Cliente desconectado de SSE");
        const index = sseConnections.indexOf(res);
        if (index !== -1) {
            sseConnections.splice(index, 1);
        }
        res.end();
    });
};
exports.maintainSSEConnection = maintainSSEConnection;
const sendSSENotification = (data) => {
    if (sseConnections.length === 0) {
        console.warn("No hay clientes conectados a SSE");
        return;
    }
    sseConnections.forEach((clientRes) => {
        clientRes.write(`data: ${JSON.stringify(data)}\n\n`);
    });
    console.info(`Notificación SSE enviada a ${sseConnections.length} clientes`);
};
exports.sendSSENotification = sendSSENotification;
//# sourceMappingURL=sseHandler.js.map