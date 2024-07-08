import { Server } from "socket.io";
import express from "express";
import * as http from "http";
import ViteExpress from "vite-express";

const app = express();
const server = http.createServer(app);

const io = new Server(server);

io.on("connection", (client) => {
    console.log(client, "사용자가 로그인했습니다.");
});
server.listen(3000, () => {
    console.log("서버에서 듣고있습니다...:3000");
});

app.get("/message", (_, res) => res.send("Hello from express!"));

app.get("/api", (_, res) => {
    res.send("Hello from api!");
});

ViteExpress.bind(app, server);