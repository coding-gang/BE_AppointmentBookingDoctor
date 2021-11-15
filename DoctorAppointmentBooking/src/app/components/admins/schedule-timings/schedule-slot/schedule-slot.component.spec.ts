import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleSlotComponent } from './schedule-slot.component';

describe('ScheduleSlotComponent', () => {
  let component: ScheduleSlotComponent;
  let fixture: ComponentFixture<ScheduleSlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleSlotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
