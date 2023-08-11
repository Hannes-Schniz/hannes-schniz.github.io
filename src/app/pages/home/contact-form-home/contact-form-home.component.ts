import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contact-form-home',
  templateUrl: './contact-form-home.component.html',
  styleUrls: ['./contact-form-home.component.scss']
})
export class ContactFormHomeComponent {
  constructor(private formBuilder: FormBuilder){}
  contactForm = this.formBuilder.group({
    name: "",
    message: ""
  });

  onSubmit() {
    console.log( this.contactForm.controls['name'].value  + "\n" + this.contactForm.controls['message'].value)
  }
}
