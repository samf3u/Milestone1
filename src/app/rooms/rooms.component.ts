import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpXhrBackend } from '@angular/common/http';
import {Router } from '@angular/router';
@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  lv_selectedGroup = null;
  lv_groupName = '';
  lv_errorMessage = '';
  lv_roomsList = [];
<<<<<<< HEAD
  lv_currentUser = JSON.parse(localStorage.getItem('user'))
  lv_currentAdmin = '';
=======
>>>>>>> 1a69ee176cd1be249edc26a6ff3f2dde53ac2a3d

  lv_allUsers = [];
  lv_selectedUser = null;
  lv_selectedUserAssis = null;
  lv_selectedUserRemove = null;

  lv_createRoomName = '';

  lv_editMode = false;

  httpClient = new HttpClient(new HttpXhrBackend({ build: () => new XMLHttpRequest() }));
  constructor(private route: Router) { }


  ngOnInit(): void {
    let lv_localGroupJSON = localStorage.getItem('group')
    this.lv_selectedGroup = JSON.parse(lv_localGroupJSON)
<<<<<<< HEAD
    this.lv_currentAdmin = this.lv_selectedGroup.admin
=======
>>>>>>> 1a69ee176cd1be249edc26a6ff3f2dde53ac2a3d
    this.lv_groupName = this.lv_selectedGroup.name
    let lv_usersJSON = localStorage.getItem('allUsers')
    let lv_users = JSON.parse(lv_usersJSON)

    for(let i=0;i<lv_users.length;i++){
      var lv_inGroup = false;

      for(let j=0; j<this.lv_selectedGroup.users.length;j++){
        if(lv_users[i].username == this.lv_selectedGroup.users[j]){
            lv_inGroup = true;
        }
      }

      if(!lv_inGroup){
        this.lv_allUsers.push(lv_users[i])
      }
      
      
    }
    
    for(let i=0;i<this.lv_selectedGroup.rooms.length;i++){
      //console.log(this.lv_selectedGroup.rooms[i].rID + '<> Room '+ (i + 1))
      this.lv_roomsList.push(this.lv_selectedGroup.rooms[i])
      console.log(this.lv_selectedGroup.rooms[i].name)
    }

  }

  /* setValues(p_newGroup){
    this.lv_selectedGroup = p_newGroup
    localStorage.setItem('group', p_newGroup)
  } */
  addUserToGroup(){
    let lv_reqBodyJSON = JSON.stringify({"gID": this.lv_selectedGroup.gID, "username": this.lv_selectedUser})
    this.httpClient.post<any>('http://localhost:3000/groups/addUser', lv_reqBodyJSON , {headers: { 
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    }}).subscribe(
      res => {
          let lv_response = res
          if(lv_response.Status == 0){
            console.log("success")
            let lv_newUser = this.lv_selectedUser
            this.lv_selectedGroup.users.push(lv_newUser)
<<<<<<< HEAD
            localStorage.setItem('group', JSON.stringify(this.lv_selectedGroup))
=======
            localStorage.setItem('group', this.lv_selectedGroup)
>>>>>>> 1a69ee176cd1be249edc26a6ff3f2dde53ac2a3d
            this.lv_selectedUser = null;

            let lv_usersJSON = localStorage.getItem('allUsers')
            let lv_users = JSON.parse(lv_usersJSON)

            this.lv_allUsers = []
            for(let i=0;i<lv_users.length;i++){
              var lv_inGroup = false;

              for(let j=0; j<this.lv_selectedGroup.users.length;j++){
                if(lv_users[i].username == this.lv_selectedGroup.users[j]){
                    lv_inGroup = true;
                }
              }

              if(!lv_inGroup){
                this.lv_allUsers.push(lv_users[i])
              }
            }
            
          } else {
            console.log('fail')
          }
          let x = 0
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
      }
    );
  }

  deleteUserFromGroup(){
    let lv_reqBodyJSON = JSON.stringify({"gID": this.lv_selectedGroup.gID, "username": this.lv_selectedUserRemove})
    this.httpClient.post<any>('http://localhost:3000/groups/removeUser', lv_reqBodyJSON , {headers: { 
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    }}).subscribe(
      res => {
          let lv_response = res
          if(lv_response.Status == 0){
            console.log("success")
            let lv_userToRemove = this.lv_selectedUserRemove
            this.lv_selectedGroup.users = this.lv_selectedGroup.users.filter(item => item != lv_userToRemove)
            //this.lv_allUsers.push(lv_userToRemove)
            //localStorage.setItem('allUsers', JSON.stringify(this.lv_allUsers))
<<<<<<< HEAD
            localStorage.setItem('group', JSON.stringify(this.lv_selectedGroup))
=======
            localStorage.setItem('group', this.lv_selectedGroup)
>>>>>>> 1a69ee176cd1be249edc26a6ff3f2dde53ac2a3d
            this.lv_selectedUserRemove = null;


            let lv_usersJSON = localStorage.getItem('allUsers')
            let lv_users = JSON.parse(lv_usersJSON)
            
            this.lv_allUsers = []
            for(let i=0;i<lv_users.length;i++){
              var lv_inGroup = false;

              for(let j=0; j<this.lv_selectedGroup.users.length;j++){
                if(lv_users[i].username == this.lv_selectedGroup.users[j]){
                    lv_inGroup = true;
                }
              }

              if(!lv_inGroup){
                this.lv_allUsers.push(lv_users[i])
              }
            }
          } else {
            console.log('fail')
          }
          let x = 0
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
      }
    );
  }

  makeGroupAssis(){
    console.log(this.lv_selectedUserAssis)
    let lv_reqBodyJSON = JSON.stringify({"gID": this.lv_selectedGroup.gID, "username": this.lv_selectedUserAssis})
    this.httpClient.post<any>('http://localhost:3000/groups/assisUser', lv_reqBodyJSON , {headers: { 
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    }}).subscribe(
      res => {
          let lv_response = res
<<<<<<< HEAD
          this.lv_selectedGroup.assis = this.lv_selectedUserAssis
          localStorage.setItem('group', JSON.stringify(this.lv_selectedGroup))
=======
          
>>>>>>> 1a69ee176cd1be249edc26a6ff3f2dde53ac2a3d
          this.lv_selectedUserAssis = null;
          let x = 0
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
      }
    );
  }
  createRoom(){
    console.log(this.lv_createRoomName)

    let lv_reqBodyJSON = JSON.stringify({"gID": this.lv_selectedGroup.gID, "name": this.lv_createRoomName})
    this.httpClient.post<any>('http://localhost:3000/rooms/create', lv_reqBodyJSON , {headers: { 
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    }}).subscribe(
      res => {
          let lv_response = res
          if (lv_response.Status == "0"){
            console.log('success')
            let lv_newRoom = JSON.parse(lv_response.room)
            this.lv_roomsList.push(lv_newRoom)
<<<<<<< HEAD
            this.lv_selectedGroup.rooms.push(lv_newRoom)
            localStorage.setItem('group', JSON.stringify(this.lv_selectedGroup))
=======
>>>>>>> 1a69ee176cd1be249edc26a6ff3f2dde53ac2a3d
            //this.lv_selectedGroup.rooms.push(lv_newRoom)
            //localStorage.setItem('group', this.lv_selectedGroup)
            this.lv_createRoomName = '';
          } else {
            console.log('fail')
          }
          let x = 0
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
      }
    );
  }

  roomClicked(p_room){
    localStorage.setItem('room', JSON.stringify(p_room))
    this.route.navigate(['/chat']);
  }
  deleteGroup(){
    let lv_reqBodyJSON = JSON.stringify({"gID": this.lv_selectedGroup.gID})
    this.httpClient.post<any>('http://localhost:3000/groups/delete', lv_reqBodyJSON , {headers: { 
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    }}).subscribe(
      res => {
          let lv_response = res
          if(lv_response.Status == 0){
            this.route.navigate(['/group']);
          } else {
            this.lv_errorMessage = lv_response.StatusMessage
          }
          let x = 0
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
      }
    );
  }

}
