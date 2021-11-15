import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomValidators } from '@shared/index';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  private customValidators: CustomValidators;
  loginForm: FormGroup;
  passHide: boolean = true;

  ngOnInit(): void {
    this.createForm()
  }

  createForm(){
    this.loginForm = this.fb.group({
      login: ['',[Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    })
  }

  test(){
    console.log(this.loginForm.value)
  }

}
