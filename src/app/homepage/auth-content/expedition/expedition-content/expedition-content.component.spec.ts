import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpeditionContentComponent } from './expedition-content.component';

describe('ExpeditionContentComponent', () => {
  let component: ExpeditionContentComponent;
  let fixture: ComponentFixture<ExpeditionContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpeditionContentComponent]
    });
    fixture = TestBed.createComponent(ExpeditionContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
