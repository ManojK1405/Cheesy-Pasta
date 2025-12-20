import { rooms } from "../utils/rooms.js";
import { Game } from "../models/gameModel.js";

export const handleMessage = (ws, message) => {
  const { type, roomId, move } = message;

  if (type === "JOIN") {
  if (!rooms[roomId]) rooms[roomId] = new Game();

  const game = rooms[roomId];

  if (game.players.length >= 2) {
    ws.send(JSON.stringify({ type: "FULL" }));
    return;
  }

  const color = game.players.length === 0 ? "w" : "b";
  ws.color = color;

  game.players.push(ws);
  ws.roomId = roomId;

  ws.send(JSON.stringify({
    type: "JOINED",
    roomId,
    color
  }));
}

  if (type === "MOVE") {
  if (!ws.roomId || !rooms[ws.roomId]) {
    ws.send(JSON.stringify({ type: "ERROR", message: "Not in a room" }));
    return;
  }

  const game = rooms[ws.roomId];

  if (ws.color !== game.chess.turn()) {
    ws.send(JSON.stringify({ type: "NOT_YOUR_TURN" }));
    return;
  }

  const result = game.chess.move(move);

  if (!result) {
    ws.send(JSON.stringify({ type: "INVALID_MOVE" }));
    return;
  }

  game.players.forEach(p =>
    p.send(JSON.stringify({
      type: "MOVE",
      move,
      fen: game.chess.fen()
    }))
  );
}


};
