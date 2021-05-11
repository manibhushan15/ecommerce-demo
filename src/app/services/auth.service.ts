import { Injectable, TemplateRef } from "@angular/core";
import { LoginDialogComponent } from "../dialog/login-dialog/login-dialog.component";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { Router } from "@angular/router";

export class LoginCred {
    username: string | undefined;
    password: string | undefined ;
}
@Injectable({
    providedIn: 'root'
})

export class AuthService {
    isLoggedIn: boolean = false;
    dummyUser: LoginCred = { username: 'demo', password: 'demo'};
    bsModalRef: BsModalRef | undefined;

    constructor(private modalService: BsModalService, private router: Router) {}

    login(user: LoginCred) {
        if(user.username == this.dummyUser.username && user.password == this.dummyUser.password)
        {
            localStorage.setItem('user', JSON.stringify(user));
            this.isLoggedIn = true;
            this.bsModalRef?.hide();
            this.router.navigate(['/billing']);
            return true;
        }  
        else {
           this.router.navigate(['/products']);
           return false;
        }  
    }

    openLoginModal() {
      this.bsModalRef = this.modalService.show(LoginDialogComponent);
    }

    close() {
        this.bsModalRef?.hide();
    }
}