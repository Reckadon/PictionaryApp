import { Socket } from "socket.io";
import { nanoid } from "nanoid";
import { Room, Rooms, roomExists } from "../Models/Rooms.js";
import { Player } from "../Models/Player.js";

const SocketEventNames = {
	CreateRoom: "createRoom",
	InitialRoomData: "initialRoomData",
	JoinRoom: "joinRoom",
	LeaveRoom: "leaveRoom",
	NewPlayer: "newPlayer",
	PlayerLeave: "playerLeave",
};

const ID_LENGTH = 7;

/**
 * @param {Socket} socket
 */
export const registerEvents = socket => {
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
		});
	});

	socket.on(SocketEventNames.JoinRoom, (username, roomID, callback) => {
		if (roomExists(roomID)) {
			socket.join(roomID);
			const i = Rooms.findIndex(room => room.roomID === roomID);
			Rooms[i].addPlayer(new Player(Rooms[i].idForNextPlayer, username));
			console.log(`${username} joined room ${roomID}`);
			callback({ status: 200 });
			socket.emit(SocketEventNames.InitialRoomData, {
				players: Rooms[i].players,
				roomID: Rooms[i].roomID,
			});
			socket.broadcast
				.to(roomID)
				.emit(SocketEventNames.NewPlayer, Rooms[i].players[Rooms[i].players.length - 1]);
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
			Rooms = Rooms.filter(room => room.roomID !== roomID);
			console.log(`deleted room ${roomID} as there are no players left`);
		}
		callback();
		socket.broadcast.to(roomID).emit(SocketEventNames.PlayerLeave, id);
	});
};
