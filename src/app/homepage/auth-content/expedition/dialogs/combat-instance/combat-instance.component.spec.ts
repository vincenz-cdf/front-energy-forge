import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombatInstanceComponent } from './combat-instance.component';

describe('CombatInstanceComponent', () => {
  let component: CombatInstanceComponent;
  let fixture: ComponentFixture<CombatInstanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CombatInstanceComponent]
    });
    fixture = TestBed.createComponent(CombatInstanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
