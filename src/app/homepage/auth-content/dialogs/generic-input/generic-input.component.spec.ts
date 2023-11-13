import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericInputComponent } from './generic-input.component';

describe('GenericInputComponent', () => {
  let component: GenericInputComponent;
  let fixture: ComponentFixture<GenericInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenericInputComponent]
    });
    fixture = TestBed.createComponent(GenericInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
