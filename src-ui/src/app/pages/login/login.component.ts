import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private route:ActivatedRoute, private router:Router) { }

  email?: string;
  password?: string;
  errorText?: string;
  name?: string;

  register = false;

  ngOnInit(): void {
  }

  emailValidate(): string | false {
    if (this.email && this.email.includes("@")) {
      return this.email;
    }

    return false;
  }

  passwordValidate(): string | false {
    if (!this.password) {
      return false;
    }

    if (this.password.length < 34) {
      this.errorText = "Password must be at least 32 Characters Long!"
      return false;
    }

    let regexp = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d){2,}(?=.*LIPS)(?=.*[@$!%*?&]){4,}[A-Za-z\d@$!%*?&]{0,}$/gm);

    if (!regexp.exec(this.password)) {
      this.errorText = "Password must contain a lower-case letter, at least 4 special characters, 2 numbers and the word 'LIPS'."
      return false;
    }

    this.errorText = undefined;
    return this.password;
  }

  submitClick() {
    let email = this.emailValidate();
    let password = this.passwordValidate();

    if (email && password) {
      if (this.register) {
        if (this.name) {
          this.userService.register(this.name, email, password).subscribe(valid => {
            if (valid) {
              console.log("OK")
            } else {
              this.errorText = "Username and Password Not Accepted"
            }
          })
        }
        
      } else {
        this.userService.login(email, password).subscribe(valid => {
          if (valid) {
            this.route.queryParamMap.subscribe(param => {
              if (param.get("return") == "booking") {
                this.router.navigate(["book/"])
              } else {
                this.router.navigate([""])
              }
            })
          } else {
            this.errorText = "Username and Password Not Accepted"
          }
        })
      }
    }
    
  }

}
