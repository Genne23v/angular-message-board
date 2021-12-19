import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  // moduleId: module.id,
  selector: 'register',
  templateUrl: 'register.component.html',
  styles: [
    `
      .error {
        background-color: #fff0f0;
      }
    `,
  ],
})
export class RegisterComponent {
  form: any;
  constructor(private formBuilder: FormBuilder, private auth: AuthService) {
    this.form = formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, emailValid]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      { validator: matchingFields('password', 'confirmPassword') }
    );
  }

  onSubmit() {
    this.auth.register(this.form.value);
  }

  isValid(control: any) {
    return (
      this.form.controls[control].invalid && this.form.controls[control].touched
    );
  }
}

function matchingFields(field1: string, field2: string) {
  return (form: any) => {
    if (form.controls[field1].value !== form.controls[field2].value)
      return { mismatchedFields: true };
  };
}

function emailValid(){
  return (control: any) => {
    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return regex.test(control.value) ? null : { invalidEmail: true}
  }
}
