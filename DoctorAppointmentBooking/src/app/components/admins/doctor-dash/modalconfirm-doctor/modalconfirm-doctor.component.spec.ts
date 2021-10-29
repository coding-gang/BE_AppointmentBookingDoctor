import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalconfirmDoctorComponent } from './modalconfirm-doctor.component';

describe('ModalconfirmDoctorComponent', () => {
  let component: ModalconfirmDoctorComponent;
  let fixture: ComponentFixture<ModalconfirmDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalconfirmDoctorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalconfirmDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
