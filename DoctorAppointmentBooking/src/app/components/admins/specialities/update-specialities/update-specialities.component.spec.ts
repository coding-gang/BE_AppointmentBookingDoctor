import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSpecialitiesComponent } from './update-specialities.component';

describe('UpdateSpecialitiesComponent', () => {
  let component: UpdateSpecialitiesComponent;
  let fixture: ComponentFixture<UpdateSpecialitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSpecialitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSpecialitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
