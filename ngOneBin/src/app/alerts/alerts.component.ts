import { Component, OnInit } from '@angular/core';
import { MessagesService } from "app/services/messages.service";
import { SocketService } from "app/services/socket.service";

@Component({
  selector: 'alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css'],
  providers: [MessagesService]
})
export class AlertsComponent implements OnInit {

  private subscriber;

  messages: Array<any> = [
    {partName : 123, partNumber : 456}
  ]

  constructor(private _ss: SocketService) {
    this._ss.getMessage('messages');
  }

  ngOnInit() {    
    this._ss.sendMessage('get messages', null);    
    this.subscriber = SocketService.newMessage.subscribe(msg => {
      this.messages = msg;
    })
  }

  ngOnChanges() {

  }

  deliverPart(part) {
    this._ss.sendMessage('deliver', part);
  }

}
