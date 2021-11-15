import { TestBed } from '@angular/core/testing';

import { ScheduleTimingsService } from './schedule-timings.service';

describe('ScheduleTimingsService', () => {
  let service: ScheduleTimingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduleTimingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
