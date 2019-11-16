import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CryptographyTestPageRoutingModule } from './cryptography-test-routing.module';

import { CryptographyTestPage } from './cryptography-test.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CryptographyTestPageRoutingModule
  ],
  declarations: [CryptographyTestPage]
})
export class CryptographyTestPageModule {}
