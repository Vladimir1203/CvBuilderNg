import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCustomStepperComponent } from './all-custom-stepper.component';

describe('AllCustomStepperComponent', () => {
  let component: AllCustomStepperComponent;
  let fixture: ComponentFixture<AllCustomStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllCustomStepperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCustomStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
