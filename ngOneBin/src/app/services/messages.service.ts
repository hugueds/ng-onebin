import { Injectable } from '@angular/core';
import { SocketService } from "app/services/socket.service";

@Injectable()

export class MessagesService {

  constructor(private _ss: SocketService) {
    this._ss.getMessage('messages');
  }

  getAll(){
    
  }

}
