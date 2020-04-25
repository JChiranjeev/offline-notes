import * as CryptoJS from 'crypto-js';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class Cipher {
    password: string;
    cipherText: string;
    plainText: string;
    constructor() {
        this.password = sessionStorage.getItem("password");
        if(this.password != null) {
            this.password = this.password.trim();
        } else {
            this.password = null;
        }
    }
    public encrypt(plainText: string) {
        plainText = plainText.trim();
        this.cipherText = CryptoJS.AES.encrypt(plainText, this.password).toString();
        return this.cipherText;
    }
    public decrypt(cipherText: string) {
        cipherText = cipherText.trim();
        this.plainText = CryptoJS.AES.decrypt(cipherText, this.password).toString(CryptoJS.enc.Utf8);
        return this.plainText;
    }
}
