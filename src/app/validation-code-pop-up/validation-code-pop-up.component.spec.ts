import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationCodePopUpComponent } from './validation-code-pop-up.component';

describe('ValidationCodePopUpComponent', () => {
  let component: ValidationCodePopUpComponent;
  let fixture: ComponentFixture<ValidationCodePopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidationCodePopUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationCodePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
