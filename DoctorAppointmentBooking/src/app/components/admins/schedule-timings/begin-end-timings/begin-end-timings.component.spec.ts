import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeginEndTimingsComponent } from './begin-end-timings.component';

describe('BeginEndTimingsComponent', () => {
  let component: BeginEndTimingsComponent;
  let fixture: ComponentFixture<BeginEndTimingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeginEndTimingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeginEndTimingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
