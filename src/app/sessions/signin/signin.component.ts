import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signupForm: FormGroup;

  constructor(private fb: FormBuilder) {
    const password = new FormControl('', Validators.required);
    this.signupForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password,
        agreed: [false, Validators.required]
      }
    );
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.signupForm && !this.signupForm.invalid) {
      // do what you wnat with your data
      console.log(this.signupForm.value);
    }
  }
}
