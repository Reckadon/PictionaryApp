import { socket } from "../socket";

/**
 * Just Connects to the socket server
 */
export const connectToSocket = () => {
	socket.connect();
};

/**
 * Disconnects from the socket server
 */
export const disconnectFromSocket = () => {
	socket.disconnect();
};

export const createAndConnectToRoom = (username, callback) => {
	socket.emit("createRoom", username, callback);
};

/**
 *  Connects to the room with id `roomID`
 * @param {string} username
 * @param {string} roomID
 * @callback callback
 */
export const connectToRoom = (username, roomID, callback) => {
	socket.emit("joinRoom", username, roomID, res => {
		callback(res.status);
	});
};
