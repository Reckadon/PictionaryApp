/**
 * @export
 * @class Player
 * @prop {number} id
 * @prop {string} username
 * @prop {number} points
 */
export class Player {
	id;
	username;
	points;
	/**
	 * Creates an instance of Player.
	 * @param {number} id
	 * @param {string} username
	 * @memberof Player
	 */
	constructor(id, username) {
		this.id = id;
		this.username = username;
		this.points = 0;
	}
}
