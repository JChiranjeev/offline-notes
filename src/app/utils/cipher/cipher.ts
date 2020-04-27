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
    }
    public encrypt(plainText: string) {
        this.getPassword();
        plainText = plainText.trim();
        this.cipherText = CryptoJS.AES.encrypt(plainText, this.password).toString();
        return this.cipherText;
    }
    public decrypt(cipherText: string) {
        try {
            this.getPassword()
            cipherText = cipherText.trim();
            this.plainText = CryptoJS.AES.decrypt(cipherText, this.password).toString(CryptoJS.enc.Utf8);
            return this.plainText;
        } catch (error) {
            throw new Error("Incorrect Password");
        }
    }
    private getPassword() {
        this.password = sessionStorage.getItem("password");
        if(this.password != null) {
            this.password = this.password.trim();
        } else {
            this.password = null;
        }
    }
}
