import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorFileComponent } from './doctor-file.component';

describe('DoctorFileComponent', () => {
  let component: DoctorFileComponent;
  let fixture: ComponentFixture<DoctorFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
