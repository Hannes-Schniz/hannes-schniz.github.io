import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactFormHomeComponent } from './contact-form-home.component';

describe('ContactFormHomeComponent', () => {
  let component: ContactFormHomeComponent;
  let fixture: ComponentFixture<ContactFormHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactFormHomeComponent]
    });
    fixture = TestBed.createComponent(ContactFormHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
