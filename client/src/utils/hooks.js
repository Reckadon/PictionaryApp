import { useEffect, useState } from "react";
import { socket } from "../socket";
/**
 * Used to sync game room data from the server
 * @return An array with the first element being the ID (playerID) of the player (this client) and second argument as the roomData
 */
export const useRoomData = () => {
	const [data, setData] = useState({});
	const [playerID, setPlayerID] = useState();
	useEffect(() => {
		socket.on("initialRoomData", roomData => {
			setData(roomData);
			setPlayerID(roomData.players[roomData.players.length - 1].id);
		});

		socket.on("newPlayer", newPlayer =>
			setData(prev => {
				return { ...prev, players: [...prev.players, newPlayer] };
			})
		);

		socket.on("playerLeave", id =>
			setData(prev => {
				return { ...prev, players: prev.players.filter(player => player.id !== id) };
			})
		);

		return () => {
			socket.off("initialRoomData");
			socket.off("newPlayer");
		};
	}, []);
	return [playerID, data];
};
