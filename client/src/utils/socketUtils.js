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

/**
 * sends a message to the server to create a new room with a random id, and joins the user in that room
 * @param {string} username
 * @callback callback
 */
export const createAndConnectToRoom = (username, callback) => {
	socket.emit("createRoom", username, () => callback());
};

/**
 *  Connects to the room with id `roomID`
 * @param {string} username
 * @param {string} roomID
 * @callback callback
 */
export const connectToRoom = (username, roomID, callback) => {
	socket.emit("joinRoom", username, roomID, res => callback(res));
};

/**
 * Leave the current game room.
 * @param {number} id id of the user
 * @param {string} roomID
 * @callback callback
 */
export const leaveRoom = (id, roomID, callback) => {
	socket.emit("leaveRoom", id, roomID, res => callback(res));
};

export const sendMessageToServer = (id, roomID, message) => {
	socket.emit("chatMsg", id, roomID, message);
};
