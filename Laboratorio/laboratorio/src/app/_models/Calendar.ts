export class Calendar {
    _id: String;
    startDate: Date;
    micro: String;
    desc: String;
    period: Number;
    badge: String;

    constructor() {
        this._id = "";
        this.micro = "";
        this.startDate = null;
        this.desc = ""
        this.period = null;
        this.badge = "";
    }
}