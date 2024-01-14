/**
 * @export
 * @class Player
 * @prop {string} username
 * @prop {number} points
 */
export class Player {
	username;
	points;
	/**
	 * Creates an instance of Player.
	 * @param {string} username
	 * @memberof Player
	 */
	constructor(username) {
		this.username = username;
		this.points = 0;
	}
}
