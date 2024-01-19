export class Message {
	sender;
	text;
	color;
	/**
	 * Creates an instance of Message.
	 * @param {(number|string)} sender
	 * @param {string} text
	 * @param {string} color
	 * @memberof Message
	 */
	constructor(sender, text, color) {
		this.sender = sender;
		this.text = text;
		this.color = color;
		return this;
	}
}
