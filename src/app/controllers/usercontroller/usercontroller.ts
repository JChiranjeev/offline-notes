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

    getUser() {
        let userJson: string;
        let decryptedText: string;
        let user: User;
        let encryptedData = this.storage.getData();
        if(encryptedData != null) {
            user = JSON.parse(this.cipher.decrypt(encryptedData)) || null;
            return user;
        }
        return null;
    }
    setUser(user: User) {
        const userJson = JSON.stringify(user);
        const crypticText = this.cipher.encrypt(userJson);
        this.storage.storeData(crypticText);
        return true;
    }
}
