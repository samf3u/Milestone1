import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import  * as io from 'socket.io-client';
const SERVER_URL = 'http://localhost:3000/chat';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket;

  constructor() { }

  public initSocket(): void {
    this.socket = io(SERVER_URL);
  }

  public joinroom(selroom):void{
    this.socket.emit("joinRoom", selroom);
  }

  public leaveroom(selroom):void{
    this.socket.emit("leaveRoom", selroom);
  }

  public joined(next){
    this.socket.on("joined", res=>next(res));
  }

  public createroom(newroom){
    this.socket.emit("newroom", newroom)
  }

  public reqnumusers(selroom){
    this.socket.on("numusers", selroom)
  }

  public getnumusers(next){
    this.socket.on("numusers", res=>next(res));
  }

  public reqroomList(){
    this.socket.emit("roomlist", 'list please')
  }

  public getroomList(next){
    this.socket.on("roomlist", res=>next(res));
  }

  public notice(next){
    this.socket.on("notice", res=>next(res));
  }

  public sendMessage(message: string): void {
    this.socket.emit('message', message);
  }

  public getMessage(next){
    this.socket.on('message', message=>next(message));
  }

  /* public onMessage(): Observable<any> {
    let observable = new Observable(observer=>{
      this.socket.on('message', (data: string) => observer.next(data));
    });
    return observable;
  } */
}
