import { Component, OnInit } from '@angular/core';
import { EncryptionService } from '../providers/encryption/encryption.service';

@Component({
  selector: 'app-cryptography-test',
  templateUrl: './cryptography-test.page.html',
  styleUrls: ['./cryptography-test.page.scss'],
})
export class CryptographyTestPage implements OnInit {

  constructor(public cryptography: EncryptionService) {
    cryptography.generateKeypair();
  }

  ngOnInit() {
  }

}
