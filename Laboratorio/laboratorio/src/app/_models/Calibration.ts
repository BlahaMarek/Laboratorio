export class Calibration {
    _id: String;
    a: number;
    b: number;
    r: number;
    name: string;
    date: Date;
    data: [{x: number; y: number}];

    constructor() {
        this._id = null;
        this.a = null;
        this.b = null;
        this.name = "";
        this.date = null;
        this.data = [ {x: null, y: null }];
    }
}