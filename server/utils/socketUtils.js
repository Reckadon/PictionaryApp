import { Server, Socket } from "socket.io";
import { nanoid } from "nanoid";
import { Room, Rooms, roomExists } from "../Models/Rooms.js";
import { Player } from "../Models/Player.js";
import { Message } from "../Models/Message.js";

const SocketEventNames = {
	CreateRoom: "createRoom",
	InitialRoomData: "initialRoomData",
	JoinRoom: "joinRoom",
	LeaveRoom: "leaveRoom",
	NewPlayer: "newPlayer",
	PlayerLeave: "playerLeave",
	ChatMessage: "chatMsg",
};

const ID_LENGTH = 7;

/**
 * @param {Server} io
 * @param {Socket} socket
 */
export const registerEvents = (io, socket) => {
	socket.on(SocketEventNames.CreateRoom, (username, callback) => {
		const uuid = nanoid(ID_LENGTH);
		socket.join(uuid);
		Rooms.push(new Room(uuid).addPlayer(new Player(0, username)));
		console.log(`${username} created and joined room ${uuid}`);
		console.log(Rooms);
		callback();
		socket.emit(SocketEventNames.InitialRoomData, {
			players: Rooms[Rooms.length - 1].players,
			roomID: Rooms[Rooms.length - 1].roomID,
			messages: Rooms[Rooms.length - 1].messages,
		});

		registerDisconnectListener(socket, uuid, 0);
	});

	socket.on(SocketEventNames.JoinRoom, (username, roomID, callback) => {
		if (roomExists(roomID)) {
			socket.join(roomID);
			const i = Rooms.findIndex(room => room.roomID === roomID);
			const playerID = Rooms[i].idForNextPlayer;
			Rooms[i].addPlayer(new Player(playerID, username));
			const joinMsg = new Message("server", `${username} joined!`, "green");
			Rooms[i].messages.push(joinMsg);
			console.log(`${username} joined room ${roomID}`);
			callback({ status: 200 });
			socket.emit(SocketEventNames.InitialRoomData, {
				players: Rooms[i].players,
				roomID: Rooms[i].roomID,
				messages: [Rooms[i].messages[Rooms[i].messages.length - 1]],
			});

			socket.broadcast
				.to(roomID)
				.emit(SocketEventNames.NewPlayer, Rooms[i].players[Rooms[i].players.length - 1]);
			socket.to(roomID).emit(SocketEventNames.ChatMessage, joinMsg);

			registerDisconnectListener(socket, roomID, playerID);
		} else {
			callback({ status: 404 });
		}
	});

	socket.on(SocketEventNames.LeaveRoom, (id, roomID, callback) => {
		socket.leave(roomID);
		const i = Rooms.findIndex(room => room.roomID === roomID);
		console.log(`player with id:${id} left room ${roomID}`);
		Rooms[i].players = Rooms[i].players.filter(player => player.id !== id);
		if (Rooms[i].players.length === 0) {
			Rooms.splice(i, 1);
			console.log(`deleted room ${roomID} as there are no players left`);
		}
		callback();
		socket.broadcast.to(roomID).emit(SocketEventNames.PlayerLeave, id);
	});

	socket.on(SocketEventNames.ChatMessage, (id, roomID, message) => {
		const i = Rooms.findIndex(room => room.roomID === roomID);
		const newMsg = new Message(id, message, "def");
		Rooms[i].messages.push(newMsg);
		console.log(id, message);
		io.to(roomID).emit(SocketEventNames.ChatMessage, newMsg);
	});
};

const registerDisconnectListener = (socket, roomID, playerID) => {
	socket.on("disconnect", () => {
		const i = Rooms.findIndex(room => room.roomID === roomID);
		if (i === -1) return;
		if (Rooms[i].players.findIndex(p => p.id === playerID) === -1) return;
		Rooms[i].players = Rooms[i].players.filter(player => player.id !== playerID);
		if (Rooms[i].players.length === 0) {
			Rooms.splice(i, 1);
			console.log(`deleted room ${roomID} as there are no players left`);
		}
		socket.broadcast.to(roomID).emit(SocketEventNames.PlayerLeave, playerID);
	});
};
