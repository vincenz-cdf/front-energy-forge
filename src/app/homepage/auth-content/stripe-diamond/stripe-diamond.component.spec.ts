import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StripeDiamondComponent } from './stripe-diamond.component';

describe('StripeDiamondComponent', () => {
  let component: StripeDiamondComponent;
  let fixture: ComponentFixture<StripeDiamondComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StripeDiamondComponent]
    });
    fixture = TestBed.createComponent(StripeDiamondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
