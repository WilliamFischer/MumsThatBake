import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CryptographyTestPage } from './cryptography-test.page';

describe('CryptographyTestPage', () => {
  let component: CryptographyTestPage;
  let fixture: ComponentFixture<CryptographyTestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CryptographyTestPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CryptographyTestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
