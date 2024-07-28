import { Server } from "socket.io";
import express from "express";
import * as http from "http";
import ViteExpress from "vite-express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true,
    },
});

io.on("connection", (client) => {
    const connectedUsername = client.handshake.query.username;

    console.log(`클라이언트 ${connectedUsername}이(가) 접속했습니다.`);

    client.broadcast.emit("new message", { username: "관리자", message: `[${connectedUsername}]님이 방에 들어왔습니다!` });

    client.on("new message", (message) => {
        console.log(message);
        io.emit("new message", { username: message.username, message: message.message });
    });

    client.on("disconnect", () => {
        console.log(`클라이언트 ${connectedUsername}가 접속 종료했습니다.`);
        io.emit("new message", { username: "관리자", message: `[${connectedUsername}]님이 방에서 나갔습니다.` });
    });
});
server.listen(3000, () => {
    console.log("서버가 포트 3000에서 실행되고 있습니다");
});

// JSON 파싱 미들웨어
app.use(express.json());

app.get("/message", (_, res) => res.send("Hello from express!"));

app.get("/api", (_, res) => {
    res.send("Hello from api!");
});

// 에러 핸들링 미들웨어
app.use((err, req, res) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
})

ViteExpress.bind(app, server);