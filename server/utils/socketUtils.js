import { Server, Socket } from "socket.io";
import { nanoid } from "nanoid";
import { Room, Rooms, roomExists } from "../Models/Rooms.js";
import { Player } from "../Models/Player.js";

const ID_LENGTH = 7;

/**
 * @param {Server} io
 * @param {Socket} socket
 */
export const registerEvents = (io, socket) => {
	socket.on("createRoom", (username, callback) => {
		const uuid = nanoid(ID_LENGTH);
		socket.join(uuid);
		Rooms.push(new Room(uuid).addPlayer(new Player(username)));
		console.log(`${username} created and joined room ${uuid}`);
		console.log(Rooms);
		callback();
	});

	socket.on("joinRoom", (username, roomID, callback) => {
		if (roomExists(roomID)) {
			socket.join(roomID);
			const i = Rooms.findIndex(room => room.roomID === roomID);
			Rooms[i].addPlayer(new Player(username));
			console.log(`${username} joined room ${roomID}`);
			console.log(Rooms);
			callback({ status: 200, roomData: Rooms[i] });
		} else {
			callback({ status: 404 });
		}
	});
};
