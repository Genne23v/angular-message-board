import { Component } from '@angular/core';
import { WebService } from './web.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'messages',
  template: `
  <div>
  <mat-card class="card">
  <mat-card-title [routerLink]="['/messages']" style="cursor: pointer;">

  </mat-card-title>
  <mat-card-content>

  </mat-card-content>
  </mat-card>
  </div>
  `,
})
export class MessagesComponent {
  constructor(public webService: WebService, private route: ActivatedRoute) {} //PRIVATE -> PUBLIC

  ngOnInit() {
    console.log(typeof this.webService.messages)
    let name = this.route.snapshot.params.name;
    this.webService.getMessages(name);

    // this.webService.messages.subscribe(messages => {
    //   this.messages = messages;
    // })
  }
  // messages = [];

  // async ngOnInit() {
  //   let res = await this.webService.getMessages();
  //   this.messages = res.json();
  // }
}
