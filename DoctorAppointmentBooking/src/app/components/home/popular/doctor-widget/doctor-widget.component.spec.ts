import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorWidgetComponent } from './doctor-widget.component';

describe('DoctorWidgetComponent', () => {
  let component: DoctorWidgetComponent;
  let fixture: ComponentFixture<DoctorWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
