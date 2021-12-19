import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import 'rxjs/add/operator/toPromise';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class WebService {
  BASE_URL = 'http://localhost:8080/api';
  messages : any = [] ;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
    this.getMessages();
  }

  async getMessages() {
    try {
      let res = await this.http.get<any>(this.BASE_URL + '/messages').toPromise();
      this.messages = res;
    } catch (err) {
      this.handleError('unable to get messages');
    }
  }

  async postMessage(message: any) {
    try {
      let res = await this.http
        .post<any>(this.BASE_URL + '/messages', message)
        .toPromise();
      this.messages.push(res);
    } catch (err) {
      this.handleError('unable to post message');
    }
  }

  private handleError(err: string) {
    console.error(err);
    this.snackBar.open(err, 'close', { duration: 2000 });
  }
}
