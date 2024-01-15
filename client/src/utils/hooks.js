import { useEffect, useState } from "react";
import { socket } from "../socket";

export const useRoomData = () => {
	const [data, setData] = useState({});
	useEffect(() => {
		socket.on("initialRoomData", roomData => {
			setData(roomData);
		});

		return () => {
			socket.off("initialRoomData");
		};
	}, []);
	return data;
};
