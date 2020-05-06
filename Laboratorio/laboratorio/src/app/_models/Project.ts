export class Project {
    _id: String;
    startDate: Date;
    name: String;
    group: String;
    workDates: Map<String, {
        desc: [{
            date: Date;
            person: String;
            comentBody: String;
        }],
        experiments: [{
            person: string;
            desc: string;
            calibration: string,
            data: [{x: number, y: number, z: number}]
            func: string,
            r: number
            activity: number
        }]
    }>;
}