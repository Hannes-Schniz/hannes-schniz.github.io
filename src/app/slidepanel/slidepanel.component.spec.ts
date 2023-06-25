import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidepanelComponent } from './slidepanel.component';

describe('SlidepanelComponent', () => {
  let component: SlidepanelComponent;
  let fixture: ComponentFixture<SlidepanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SlidepanelComponent]
    });
    fixture = TestBed.createComponent(SlidepanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
