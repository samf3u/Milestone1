import { Component, OnInit } from '@angular/core';
import { Group} from '../models/GroupModel';
import { User} from '../models/UserModel';
import { HttpClient, HttpErrorResponse, HttpXhrBackend } from '@angular/common/http';
import {Router } from '@angular/router';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  //### Groups page
  lv_listOfGroups = [];
  lv_isInGroup = false;
  lv_currentGroup = new Group('','','','',[]);
  lv_currentUser = JSON.parse(localStorage.getItem('user'))

  //### Create user
  lv_createUsername = '';
  lv_createEmail = '';
  lv_errorMessage = '';
  lv_successMessage = '';

  //### Users
  lv_allUsers = [];
  lv_selectedUser = null;

  //### Create group
  lv_createGroupName = '';
  lv_createGroupAdmin = null;
  lv_createGroupAssis = null;

  lv_editMode = false;

  httpClient = new HttpClient(new HttpXhrBackend({ build: () => new XMLHttpRequest() }));
  constructor(private route: Router) { }

  fetchGroups(){
    this.httpClient.post<any>('http://localhost:3000/groups/fetch', JSON.stringify({ 'username' : this.lv_currentUser.username}) , {headers: { 
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    }}).subscribe(
      res => {
          let lv_response = res
          var i;
          for(i=0;i<lv_response.length;i++){
              this.lv_listOfGroups.push(lv_response[i])
          }

          for(i=0;i<this.lv_listOfGroups.length;i++){
            console.log(this.lv_listOfGroups[i].name)
            let ix = 0
        }
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
      }
    );
  }

  createUser(){
    //Remove notice text when clicking button again
    this.lv_errorMessage = ''
    this.lv_successMessage = ''

    let lv_reqBodyJSON = JSON.stringify({"username": this.lv_createUsername, "email": this.lv_createEmail})
    this.httpClient.post<any>('http://localhost:3000/login/create', lv_reqBodyJSON , {headers: { 
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    }}).subscribe(
      res => {
          let lv_response = res
          if (lv_response.Status == "1"){
            this.lv_errorMessage = lv_response.StatusMessage + '!'
          } else {
           
            this.lv_successMessage = this.lv_createUsername + " was successfully created!"
            this.lv_createUsername = ''
            this.lv_createEmail = ''
          }
          this.getUsers()
          let x = 0
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
      }
    );
  }

  createGroup(){
    console.log(this.lv_createGroupName + '<>' + this.lv_createGroupAdmin + '<>' + this.lv_createGroupAssis)
    
    let lv_reqBodyJSON = JSON.stringify({"name": this.lv_createGroupName, "admin": this.lv_createGroupAdmin, "assis": this.lv_createGroupAssis})
    this.httpClient.post<any>('http://localhost:3000/groups/create', lv_reqBodyJSON , {headers: { 
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    }}).subscribe(
      res => {
          let lv_response = res
          if (lv_response.Status == "1"){
            this.lv_errorMessage = lv_response.StatusMessage + '!'
          } else {
            let lv_newGroup = JSON.parse(lv_response.group)
            this.lv_listOfGroups.push(lv_newGroup)
            this.lv_successMessage = "Group was successfully created!"
            //this.lv_createUsername = ''
            //this.lv_createEmail = ''
            this.lv_createGroupAdmin = null;
            this.lv_createGroupAssis = null;
            this.lv_createGroupName = ''
          }
          let x = 0
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
      }
    );
  }

  groupClicked(p_group){
    console.log(p_group)
    localStorage.setItem('group', JSON.stringify(p_group))
    localStorage.setItem('allUsers', JSON.stringify(this.lv_allUsers))
    this.route.navigate(['/rooms']);
  }

  removeUser(){
    console.log(this.lv_selectedUser)
    let lv_reqBodyJSON = JSON.stringify({"username": this.lv_selectedUser})
    this.httpClient.post<any>('http://localhost:3000/login/delete', lv_reqBodyJSON , {headers: { 
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    }}).subscribe(
      res => {
          let lv_response = res
          if (lv_response.Status == "1"){
            this.lv_errorMessage = lv_response.StatusMessage + '!'
          } else {
            this.lv_successMessage = this.lv_createUsername + " was successfully deleted!"
            //this.lv_createUsername = ''
            //this.lv_createEmail = ''
            this.lv_selectedUser = null
            this.getUsers()
          }
          
          let x = 0
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
      }
    );
  }
  getUsers(){
    this.httpClient.get<any>('http://localhost:3000/login/').subscribe(
      res => {
          let lv_response = res
          var i;
          this.lv_allUsers = []
          for(i=0;i<lv_response.length;i++){
              this.lv_allUsers.push(lv_response[i])
          }
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
      }
    );
  }
      

  ngOnInit(): void {
    this.fetchGroups();
    this.getUsers();
    /* let localGroups = localStorage.getItem('groups');

    if (localGroups == undefined){
      console.log("fill up")
      localStorage.setItem('groups', JSON.stringify(this.populateGroups()))
    } else {
      let lv_toObject = JSON.parse(localGroups)

      var i;
      for (i=0;i<lv_toObject.length;i++){
          console.log(i + ' ' + lv_toObject[i])
      }
      console.log("found something")
    } */

  }

}
