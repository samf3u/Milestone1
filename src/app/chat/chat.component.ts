import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpXhrBackend } from '@angular/common/http';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  lv_currentRoom = null;
  lv_currentGroup = null;
  messagecontent = '';
  lv_usersNotInRoom = [];

  lv_selectedUser = null;

  lv_selectedUserRemove = null;

  lv_editMode = false;

<<<<<<< HEAD
  lv_currentUser = JSON.parse(localStorage.getItem('user'))
  lv_currentAdmin = '';
  lv_currentAssis = '';

=======
>>>>>>> 1a69ee176cd1be249edc26a6ff3f2dde53ac2a3d
  httpClient = new HttpClient(new HttpXhrBackend({ build: () => new XMLHttpRequest() }));
  constructor() {}

  ngOnInit(): void {
    let lv_roomJSON = localStorage.getItem('room')
    this.lv_currentRoom = JSON.parse(lv_roomJSON)

    let lv_groupJSON = localStorage.getItem('group')
    this.lv_currentGroup = JSON.parse(lv_groupJSON)

<<<<<<< HEAD
    this.lv_currentAdmin = this.lv_currentGroup.admin
    this.lv_currentAssis = this.lv_currentGroup.assis
=======
>>>>>>> 1a69ee176cd1be249edc26a6ff3f2dde53ac2a3d
    this.lv_usersNotInRoom = this.groupUsersNotInRoom(this.lv_currentGroup.users, this.lv_currentRoom.users)
    let ix = 0
  }
  chat(){
    let lv_userJSON = localStorage.getItem('user')
    let lv_user = JSON.parse(lv_userJSON)
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    this.lv_currentRoom.history.push(lv_user.username + ': ' + this.messagecontent)
    for(let i=0;i<this.lv_currentGroup.rooms.length;i++){
      if(this.lv_currentRoom.rID == this.lv_currentGroup.rooms[i].rID){
        this.lv_currentGroup.rooms[i] = this.lv_currentRoom
      }
    }
    localStorage.setItem('room', JSON.stringify(this.lv_currentRoom))
    localStorage.setItem('group', JSON.stringify(this.lv_currentGroup))
    this.messagecontent = ''

    
    let lv_reqBodyJSON = JSON.stringify({"history": this.lv_currentRoom.history, "rID": this.lv_currentRoom.rID, "gID": this.lv_currentGroup.gID})
    this.httpClient.post<any>('http://localhost:3000/rooms/saveChat', lv_reqBodyJSON , {headers: { 
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    }}).subscribe(
      res => {
          let lv_response = res
          if (lv_response.Status == "1"){
            console.log('error')
          } else {
            console.log('success')
            
          }
          let x = 0
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
      }
    );
    // Save to server
  }

  test(){
    /* let lv_allGroupsJSON = localStorage.getItem('groups')
    let lv_allGroups = JSON.parse(lv_allGroupsJSON)
    let lv_groupJSON = localStorage.getItem('group')
    let lv_group = this.lv_currentGroup

    for(let i=0; i<lv_allGroups.length; i++){
      if(lv_allGroups[i].gID == lv_group.gID){
        lv_allGroups[i] = lv_group
        localStorage.setItem('groups', JSON.stringify(lv_allGroups))
        localStorage.setItem('group', JSON.stringify(lv_group))
        break
      }
    } */
      let lv_currentUser = JSON.parse(localStorage.getItem('user'))
      this.httpClient.post<any>('http://localhost:3000/groups/fetch', JSON.stringify({ 'username' : lv_currentUser.username}) , {headers: { 
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json'
      }}).subscribe(
        res => {
            let lv_response = res
            
            localStorage.setItem('groups', lv_response)
            
            var i;
        },
        (err: HttpErrorResponse) => {
          console.log(err.error);
        }
      );
    

  }

  addUserToRoom(){
    console.log(this.lv_selectedUser)

    let lv_reqBodyJSON = JSON.stringify({"username": this.lv_selectedUser, "rID": this.lv_currentRoom.rID, "gID": this.lv_currentGroup.gID})
    this.httpClient.post<any>('http://localhost:3000/rooms/addUser', lv_reqBodyJSON , {headers: { 
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    }}).subscribe(
      res => {
          let lv_response = res
          if (lv_response.Status == "1"){
            console.log('error')
          } else {
            console.log('success')
            this.lv_currentRoom.users.push(this.lv_selectedUser)
            this.lv_usersNotInRoom = this.lv_usersNotInRoom.filter(item => item != this.lv_selectedUser)
            this.lv_selectedUser = null;
            
            for(let i=0;i<this.lv_currentGroup.rooms.length;i++){
              if(this.lv_currentRoom.rID == this.lv_currentGroup.rooms[i].rID){
                this.lv_currentGroup.rooms[i] = this.lv_currentRoom
              }
            }
            localStorage.setItem('room', JSON.stringify(this.lv_currentRoom))
            localStorage.setItem('group', JSON.stringify(this.lv_currentGroup))
            
          }
          let x = 0
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
      }
    );
  }

  deleteUserFromRoom(){
    console.log(this.lv_selectedUserRemove)

    let lv_reqBodyJSON = JSON.stringify({"username": this.lv_selectedUserRemove, "gID": this.lv_currentGroup.gID, "rID": this.lv_currentRoom.rID})
    this.httpClient.post<any>('http://localhost:3000/rooms/removeUser', lv_reqBodyJSON , {headers: { 
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    }}).subscribe(
      res => {
          let lv_response = res
          if (lv_response.Status == "1"){
            console.log('error')
          } else {
            console.log('success')
            this.lv_currentRoom.users = this.lv_currentRoom.users.filter(item => item != this.lv_selectedUserRemove)
            this.lv_usersNotInRoom.push(this.lv_selectedUserRemove)
            this.lv_selectedUserRemove = null;

            for(let i=0;i<this.lv_currentGroup.rooms.length;i++){
              if(this.lv_currentRoom.rID == this.lv_currentGroup.rooms[i].rID){
                this.lv_currentGroup.rooms[i] = this.lv_currentRoom
              }
            }
            localStorage.setItem('room', JSON.stringify(this.lv_currentRoom))
            localStorage.setItem('group', JSON.stringify(this.lv_currentGroup))

          }
          let x = 0
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
      }
    );
  }

  groupUsersNotInRoom(p_groupUsers, p_roomUsers){
    var lv_return = []
    
    for(let i=0; i<p_groupUsers.length; i++){
        var lv_inRoom = false
        for(let j=0;j<p_roomUsers.length; j++){
          if(p_groupUsers[i] == p_roomUsers[j]){
              lv_inRoom = true
              break
          }
        }
        if(!lv_inRoom){
          lv_return.push(p_groupUsers[i])
        }
    }

    return lv_return
  }
}
