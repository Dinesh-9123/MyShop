import { Component, OnDestroy, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isLoggedIn:boolean = false;
  isAdmin: boolean = false;
  data:Subscription;
  items: MenuItem[];
  constructor(private auth:AuthService) { }

  ngOnInit(): void {
    this.getToken();
    this.data = this.auth.authUser.subscribe((res)=>{
      this.isLoggedIn = !!res.token;
      this.getItems();
    })
    this.getItems();
  }

  getToken(){
    let token = localStorage.getItem('token');
    let expireesIn = localStorage.getItem('expiresIn');
    let roleId = localStorage.getItem('userRole');
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
      if(roleId != null){
        if(+roleId === 1){
          this.isAdmin = true;
        }
        else{
          this.isAdmin = false;
        }
      }
      
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

  getItems(){
    this.items = [
      {
          label:'MyShop'
      },
      {
          label:'Users',
          icon:'pi pi-fw pi-user',
          items:[
              {
                  label:'My Cart',
                  routerLink:'/cart'

              },
              {
                  label:'Shipping Products',
                  routerLink: '/cart/shipping-address'
              },
              {
                  label:'My Orders',
                  routerLink: '/cart/orders'
              }
          ],
          visible: this.isLoggedIn,
      },
      {
          label:'Admin',
          items:[
              {
                  label:'Products',
                  routerLink: '/admin-products'
              },
              {
                  label:'Product Form',
                  routerLink: '/product-form'
              }
          ],
          visible: this.isLoggedIn && this.isAdmin,
      },
      {
        label:'Products',
        routerLink:'/products'
      },
      {
          label:'LogOut',
          visible: this.isLoggedIn,
          command:()=>{
            this.logOut();
          }
      },
      {
        label:'LogIn',
        routerLink:'/auth',
        visible: !this.isLoggedIn,
      }
  ];
  }

}
