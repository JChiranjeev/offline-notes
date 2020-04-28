import { Book } from '../book/book';

export class User {
    constructor() { }
    name: string;
    username : string;
    password : string;
    books : Array<Book>;
}
