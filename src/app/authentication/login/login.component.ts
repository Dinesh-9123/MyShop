import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm:FormGroup;

  constructor(private auth:AuthService, private router: Router) { }
  
  ngOnInit(): void {
    this.initializeForm();
    this.getToken();
  }

  getToken(){
    let token = localStorage.getItem('token');
    let expiresIn = localStorage.getItem('expiresIn');

    let time = new Date().getTime();
    let remenningTime = null;
    if(expiresIn != null){
      remenningTime = +(+expiresIn - time);
    }
    else{
      this.auth.LogOut();
    }
    if(token != '' && token != null && expiresIn != null){
      const expirationDate = new Date(new Date().getTime() + +expiresIn* 60 * 1000)
      this.auth.authUser.next({
        _token : token,
        _tokenExpirationDate : expirationDate,
        token: token
      })
      if(remenningTime != null){
        this.router.navigateByUrl('/products');
      }
      else{
        this.auth.LogOut();
      }
    }    
  }


  initializeForm(){
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('',[Validators.required])
    })
  }

  Login(){
    this.auth.Login(
      this.loginForm.controls['email'].value,
      this.loginForm.controls['password'].value
      ).subscribe((res)=>{
          if(res.isError){
            console.log(res.errorMessage);
          }
          else{
            localStorage.setItem('token',res.result.token);
            let time = new Date().getTime() +  +res.result.expiresIn * 60 * 1000;
            localStorage.setItem('expiresIn',time.toString());
            this.loginForm.reset();  
            this.auth.autoLogOut(+res.result.expiresIn * 60 * 1000);
            this.auth.getRole().subscribe(res=>{
              if(res.isError){
                console.log(res.errorMessage);
              }
              else{
                localStorage.setItem('userRole', res.result);
              }
            })
            this.router.navigateByUrl("/products");
          }
      })
  }

  SignUp(){
    this.router.navigateByUrl("auth/signup")
  }
}
