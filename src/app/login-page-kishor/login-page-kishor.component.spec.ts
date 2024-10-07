import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPageKishorComponent } from './login-page-kishor.component';

describe('LoginPageKishorComponent', () => {
  let component: LoginPageKishorComponent;
  let fixture: ComponentFixture<LoginPageKishorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginPageKishorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginPageKishorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
