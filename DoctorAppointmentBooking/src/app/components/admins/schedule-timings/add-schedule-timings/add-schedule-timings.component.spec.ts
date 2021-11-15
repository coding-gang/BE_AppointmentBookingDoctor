import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddScheduleTimingsComponent } from './add-schedule-timings.component';

describe('AddScheduleTimingsComponent', () => {
  let component: AddScheduleTimingsComponent;
  let fixture: ComponentFixture<AddScheduleTimingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddScheduleTimingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddScheduleTimingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
