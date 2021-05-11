import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AuthService, LoginCred } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {
  user: LoginCred = new LoginCred();
  loginForm!: FormGroup;
  bsModalRef: BsModalRef | undefined;
  isValid: boolean = true;

  constructor(private authSvc: AuthService,
    private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login() {
    this.isValid = this.authSvc.login(this.user);
  }

  close() {
    this.authSvc.close();
  }
}
