import { Injectable, Inject } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  storageKey = environment.local_storage_key;
  data: string;

  constructor(@Inject(LOCAL_STORAGE) private storage : StorageService) { }

  getData() {
    this.data = this.storage.get(this.storageKey) || null;
    return this.data;
  }

  storeData(data: string) {
    this.storage.set(this.storageKey, data);
  }
}
