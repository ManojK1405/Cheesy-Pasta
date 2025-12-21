import express from "express";
import { WebSocketServer } from "ws";
import { handleMessage } from "./controllers/gameController.js";

const app = express();
const port = 4005;

const server = app.listen(port, () => {
  console.log(`Server running on ${port}`);
});

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  ws.on("message", (data) => {
    const message = JSON.parse(data.toString());
    handleMessage(ws, message);
  });
});
