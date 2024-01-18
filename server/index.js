import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { Server } from "socket.io";
import { registerEvents } from "./utils/socketUtils.js";

const PORT = process.env.PORT || 4000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
	cors: {
		origin: "http://localhost:3000",
	},
});

app.use(express.static(path.join(__dirname, "..", "client", "build"))); //serving react app while in prod

io.on("connection", socket => {
	console.log("a client connected");
	registerEvents(io, socket);

	socket.on("disconnect", reason => {
		console.log(reason);
	});
});

httpServer.listen(PORT, () => console.log(`listening at port:${PORT}`));
