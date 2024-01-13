import { Server, Socket } from "socket.io";
import { nanoid } from "nanoid";

const ID_LENGTH = 5;

/**
 * @param {Server} io
 * @param {Socket} socket
 */
export const registerEvents = (io, socket) => {
	socket.on("createRoom", (username, callback) => {
		const uuid = nanoid(ID_LENGTH);
		socket.join(uuid);
		console.log(`${username} created and joined room ${uuid}`);
		callback();
	});

	const isValidRoomID = id => {
		const rooms = Array.from(io.sockets.adapter.rooms);

		for (let index = 0; index < rooms.length; index++) {
			const room = rooms[index];
			if (room[0] == id) return true;
		}
		return false;
	};

	socket.on("joinRoom", (username, roomID, callback) => {
		if (isValidRoomID(roomID)) {
			socket.join(roomID);
			console.log(`${username} joined room ${roomID}`);
			callback({ status: 200 });
		} else {
			callback({ status: 404 });
		}
	});
};
