import { Book } from '../book/book';

export class User {
    constructor() { }
    username : string;
    password : string;
    books : Array<Book>;
}
