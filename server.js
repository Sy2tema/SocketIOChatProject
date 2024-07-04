import { Server } from "socket.io";
import express from "express";
import * as http from "http";
import ViteExpress from "vite-express";

const app = express();
const server = http.createServer(app);

const io = new Server(server);

io.on("connection", () => { /*... */ });
server.listen(3000, () => {
    console.log("서버에서 듣고있습니다...:3000");
});

ViteExpress.bind(app, server);