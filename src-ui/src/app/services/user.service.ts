import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import * as shajs from 'sha.js';

export interface User {
  user_id: number,
  name: string,
  email: string,
  password_hash: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private _currentUser?: User;

  public get authenticatedUser(): User | undefined {
    if (!this._currentUser) {
      let stored_value = localStorage.getItem("user")
      if (stored_value) {
        this._currentUser = JSON.parse(stored_value);
        return this._currentUser
      }

      return undefined;
    }

    return this._currentUser;
  }

  public set authenticatedUser(user: User | undefined) {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user))
    } else {
      localStorage.removeItem("user")
    }
    this._currentUser = user;
  }

  setUser(loginResponse: Observable<HttpResponse<Object>>) {
    return loginResponse.pipe(
      catchError((error: HttpErrorResponse) => {
        return new Observable<boolean>(subscriber => {
          subscriber.next(false);
          subscriber.complete();
        });
      }),
      tap((response: HttpResponse<Object> | boolean) => {
        if (typeof(response) != 'boolean') {
          if (response.body) {
            this.authenticatedUser = <User>response.body
          }
        }
      })
    );
  }

  public login(email: string, password: string) {
    let password_hash = shajs("sha256").update(password).digest("hex");
    return this.setUser(this.http.post("/api/users/login", {email: email, password_hash: password_hash}, { observe: "response" }));
  }

  public register(name: string, email: string, password: string) {
    let password_hash = shajs("sha256").update(password).digest("hex");
    return this.setUser(this.http.post("/api/users/register", {email: email, password_hash: password_hash, name: name}, {observe: "response"}));
  }

  public logout() {
    this.authenticatedUser = undefined;
  }
}
