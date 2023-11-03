import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MidnightCountdownComponent } from './midnight-countdown.component';

describe('MidnightCountdownComponent', () => {
  let component: MidnightCountdownComponent;
  let fixture: ComponentFixture<MidnightCountdownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MidnightCountdownComponent]
    });
    fixture = TestBed.createComponent(MidnightCountdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
