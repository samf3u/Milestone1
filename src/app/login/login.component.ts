import { Component, OnInit } from '@angular/core';
import {Router } from '@angular/router';
import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpXhrBackend } from '@angular/common/http';

interface User{
  username: String;
  email: String;
};


@Injectable({
  providedIn: 'root'
  })

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})



export class LoginComponent implements OnInit {
  httpClient = new HttpClient(new HttpXhrBackend({ build: () => new XMLHttpRequest() }));
  constructor(private route: Router) {}

  

  ngOnInit(): void {
    localStorage.clear()
  }

  errorMessage = "";
  user = {
    username: "",
    password: ""
  };

  loginClicked(){
    this.httpClient.post<any>('http://localhost:3000/login/auth', JSON.stringify(this.user) , {headers: { 
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    }}).subscribe(
      res => {
        console.log(res.username);
        if (res.username != ''){
          //console.log(JSON.stringify(res))
          localStorage.setItem('user', JSON.stringify(res))
          this.route.navigate(['/group']);
        } else {
          this.errorMessage = "Invalid Login Details!"
        }
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
      }
    ); 
  }

}
