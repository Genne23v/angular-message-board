import { Component } from '@angular/core';
import { WebService } from './web.service';

@Component({
  selector: 'new-message',
  template: `
    <mat-card class="card">
      <mat-card-content>
        <mat-form-field>
          <input matInput placeholder="Name" [(ngModel)]="message.owner" />
        </mat-form-field>
        <mat-form-field>
          <textarea
            matInput
            placeholder="Message"
            [(ngModel)]="message.text"
          ></textarea>
        </mat-form-field>
        <mat-card-actions>
          <button (click)="post()" mat-button color="primary">POST</button>
        </mat-card-actions>
      </mat-card-content>
    </mat-card>
  `,
})
export class NewMessageComponent {

  // @Output() onPosted = new EventEmitter();

  constructor(private webService: WebService) {}

  message = {
    owner: '',
    text: '',
  };

  post() {
    this.webService.postMessage(this.message);
    // this.onPosted.emit(this.message)
  }
}
