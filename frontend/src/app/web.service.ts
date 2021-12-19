import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import 'rxjs/add/operator/toPromise';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

@Injectable()
export class WebService {
  BASE_URL = 'http://localhost:8080/api';
  private messageStore : any = [];
  private messageSubject = new Subject();
  messages = this.messageSubject.asObservable();

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
    this.getMessages(null);
  }

  getMessages(user: any) {
    user = (user) ? '/' + user : '';
    this.http.get<any>(this.BASE_URL + '/messages' + user).subscribe(res => {
      this.messageStore = res;
      this.messageSubject.next(this.messageStore);
    }, err => {
      this.handleError('unable to get messages');
    });
  }

  async postMessage(message: any) {
    try {
      let res = await this.http
        .post<any>(this.BASE_URL + '/messages', message)
        .toPromise();
      this.messageStore.push(res.json());
      this.messageSubject.next(this.messageStore);
    } catch (err) {
      this.handleError('unable to post message');
    }
  }

  private handleError(err: string) {
    console.error(err);
    this.snackBar.open(err, 'close', { duration: 2000 });
  }
}
