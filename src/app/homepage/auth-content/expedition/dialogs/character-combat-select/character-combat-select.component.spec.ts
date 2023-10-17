import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterCombatSelectComponent } from './character-combat-select.component';

describe('CharacterCombatSelectComponent', () => {
  let component: CharacterCombatSelectComponent;
  let fixture: ComponentFixture<CharacterCombatSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CharacterCombatSelectComponent]
    });
    fixture = TestBed.createComponent(CharacterCombatSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
