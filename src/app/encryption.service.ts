import { Injectable } from '@angular/core';
import { NodeRsa } from 'node-rsa';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  constructor() {
    var key = new NodeRsa({b: 512});
    console.log(key);
  }
}
