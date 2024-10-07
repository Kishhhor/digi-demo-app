import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WearhouseComponent } from './wearhouse.component';

describe('WearhouseComponent', () => {
  let component: WearhouseComponent;
  let fixture: ComponentFixture<WearhouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WearhouseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WearhouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
