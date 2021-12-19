import { Component } from '@angular/core';
import { WebService } from './web.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'messages',
  template: ` <div *ngFor="let message of webService.messages">
    <mat-card class="card" style="margin: 8px;">
      <mat-card-title
        [routerLink]="['/messages', message.owner]"
        style="cursor: pointer"
      >
        {{ message.owner }}
      </mat-card-title>
      <mat-card-content>
        {{ message.text }}
      </mat-card-content>
    </mat-card>
  </div>`,
})
export class MessagesComponent {
  constructor(public webService: WebService, private route: ActivatedRoute) {} //PRIVATE -> PUBLIC

  ngOnInit(){
    console.log(this.route.snapshot.params)
  }
  // messages = [];

  // async ngOnInit() {
  //   let res = await this.webService.getMessages();
  //   this.messages = res.json();
  // }
}
