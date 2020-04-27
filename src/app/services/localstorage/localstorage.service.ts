import { Injectable, Inject } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { environment } from '../../../environments/environment';
import { Cipher } from 'src/app/utils/cipher/cipher';
import { User } from 'src/app/models/user/user';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
  
  userData: User;

  constructor(@Inject(LOCAL_STORAGE) private storage : StorageService, private cipher : Cipher) { }

  getData(username: string) {
    // try {
      let tempData = this.storage.get(username) || null;
      if(tempData != null) {
        this.userData = JSON.parse(this.cipher.decrypt(tempData));
        return this.userData;
      }
      return null;
    // } catch (error) {
    //   console.log(error);
    //   throw error;
    // }
  }

  storeData(username: string, user: User) {
    let encryptedData = this.cipher.encrypt(JSON.stringify(user));
    this.storage.set(username, encryptedData);
  }
}
