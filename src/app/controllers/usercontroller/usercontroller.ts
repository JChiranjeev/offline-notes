import { User } from 'src/app/models/user/user';
import { LocalstorageService } from 'src/app/services/localstorage/localstorage.service';
import { Cipher } from 'src/app/utils/cipher/cipher';
import { stringify } from 'querystring';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class Usercontroller {

    constructor(private storage: LocalstorageService, private cipher: Cipher) { }

    getUser(username: string) {
        let user: User;
        user = this.storage.getData(username);
        return user;
    }
    addUser(username: string, user: User) {
        if(this.storage.getData(username) == null) {
            this.storage.storeData(username, user);
            return true;
        } else {
            return false;
        }
    }
    saveUser(username: string, user: User) {
        if(this.storage.getData(username) != null) {
            this.storage.storeData(username, user);
            return true;
        } else {
            return false;
        }
    }
}
