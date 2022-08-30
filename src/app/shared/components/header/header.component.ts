import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isLoggedIn:boolean = false;
  data:Subscription;

  constructor(private auth:AuthService) { }

  ngOnInit(): void {
    this.getToken();
    this.data = this.auth.authUser.subscribe((res)=>{
      this.isLoggedIn = !!res.token;
    })
    
  }

  getToken(){
    let token = localStorage.getItem('token');
    let expireesIn = localStorage.getItem('expiresIn');
    let time = new Date().getTime();
    let remenningTime = null;
    if(expireesIn != null){
      remenningTime = +(+expireesIn - time);
    }
    else{
      this.auth.LogOut();
    }
    if(token != '' && token != null && expireesIn != null){
      this.isLoggedIn = true;
      if(remenningTime != null){
        this.auth.autoLogOut(remenningTime)
      }
      else{
        this.auth.LogOut();
      }
    }
  }

  logOut(){
    localStorage.removeItem('token');
    this.auth.LogOut();
  }

  ngOnDestroy(): void {
    this.data.unsubscribe
  }

}
