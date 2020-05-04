export class Message {
    _id: String;
    from: String;
    to: String;
    timestamp: Date;
    message: String;
    read: Boolean;

    constructor() {
        this._id = null;
        this.from = "";
        this.to = "";
        this.timestamp = null;
        this.message = "";
        this.read = false;
    }
}