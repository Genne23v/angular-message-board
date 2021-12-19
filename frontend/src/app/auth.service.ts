import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class AuthService{
  BASE_URL = 'http://localhost:8080/auth';

  constructor(private http: HttpClient){}

  register(user: any) {
    delete user.confirmPassword;
    this.http.post(this.BASE_URL + '/register', user).subscribe();
  }
}
