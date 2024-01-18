export class Message {
	sender;
	text;
	constructor(sender, text) {
		this.sender = sender;
		this.text = text;
		return this;
	}
}
