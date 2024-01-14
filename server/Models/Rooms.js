import { Player } from "./Player.js";

/**
 * @type {Array.<Room>} Array holding all the Room objects of the app.
 */
export const Rooms = [];

/**
 * checks if a room exists in the Rooms array with the given roomID
 * @param {string} roomID
 * @return {boolean}
 */
export const roomExists = roomID => {
	for (let index = 0; index < Rooms.length; index++) {
		const Room = Rooms[index];
		if (Room.roomID === roomID) return true;
	}
	return false;
};

/**
 * @export
 * @class Room
 * @prop {string} roomID
 * @prop {Array.<Player>} players
 */
export class Room {
	roomID;
	players;

	/**
	 * Creates an instance of Room.
	 * @param {string} roomID
	 * @memberof Room
	 * @returns the instance
	 */
	constructor(roomID) {
		this.roomID = roomID;
		this.players = [];
		return this;
	}

	/**
	 * @param {Player} player
	 * @memberof Room
	 * @returns the instance
	 */
	addPlayer(player) {
		this.players.push(player);
		return this;
	}
}
