export class User {
    _id: String;
    login: String;
    email: String;
    password: String;
    roles: [
        {
            _id: String,
            role: String
        }];
    groups: [
        {
            _id: String,
            group: String
        }];
}