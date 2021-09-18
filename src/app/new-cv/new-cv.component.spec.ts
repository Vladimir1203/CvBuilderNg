import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCVComponent } from './new-cv.component';

describe('NewCVComponent', () => {
  let component: NewCVComponent;
  let fixture: ComponentFixture<NewCVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCVComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
