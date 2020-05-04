export class User {
    _id: string;
    login: string;
    email: string;
    password: string;
    roles: [
        {
            _id: string,
            role: string
        }];
    groups: [
        {
            _id: string,
            group: string
        }];
}