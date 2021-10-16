import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailabeFeaturesComponent } from './availabe-features.component';

describe('AvailabeFeaturesComponent', () => {
  let component: AvailabeFeaturesComponent;
  let fixture: ComponentFixture<AvailabeFeaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailabeFeaturesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailabeFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
