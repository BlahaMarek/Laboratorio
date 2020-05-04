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
            person: String;
            desc: String;
        }]
    }>;
}