import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CryptographyTestPage } from './cryptography-test.page';

const routes: Routes = [
  {
    path: '',
    component: CryptographyTestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CryptographyTestPageRoutingModule {}
