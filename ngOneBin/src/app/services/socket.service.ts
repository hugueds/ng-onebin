import { Injectable, EventEmitter } from '@angular/core';
import * as io from 'socket.io-client';


@Injectable()
export class SocketService {

  private readonly url: string = 'http://10.8.66.81:8083';
  private static socket;
  // private socket;

  public static newMessage = new EventEmitter<any>();

  constructor() {
    SocketService.socket = io.connect(this.url);        
    // this.socket = io.connect(this.url);
  }

  onConnect(topic) {
     SocketService.socket.on('connect', () => this.getMessage(topic));
    // this.socket.on('connect', () => this.socket.emit('get messages'));
  }

  sendMessage(topic, message) {
    SocketService.socket.emit(topic, message)
    // this.socket.emit(topic, message)
  }

  getMessage(topic) {
    SocketService.socket.on(topic, (data) => SocketService.newMessage.emit(data));
    // this.socket.on(topic, (data) => SocketService.newMessage.emit(data));
  }


}
