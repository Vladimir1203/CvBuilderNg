import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCustomComponent } from './all-custom.component';

describe('AllCustomComponent', () => {
  let component: AllCustomComponent;
  let fixture: ComponentFixture<AllCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllCustomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
