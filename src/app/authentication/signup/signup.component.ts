import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignUp } from 'src/app/models/sign-up.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  data : SignUp = {
    userId : 0,
    email : '',
    password : '',
    firstName : '',
    lastName : '',
    mobNo : '',
    roles: 0
  }
  constructor(private auth: AuthService, private route: Router) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(){
    this.signUpForm = new FormGroup({
      email: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required]),
      confPassword : new FormControl('',[Validators.required]),
      firstName: new FormControl('',[Validators.required]),
      lastName: new FormControl('',[Validators.required]),
      mobNo: new FormControl('',[Validators.required]),
      roles: new FormControl(0)
    })
  }
  signUp(){

    if(this.signUpForm.controls['password'].value !== this.signUpForm.controls['confPassword'].value){
      return;
    }
    else{
      this.data.email = this.signUpForm.controls['email'].value;
      this.data.password = this.signUpForm.controls['password'].value;
      this.data.firstName = this.signUpForm.controls['firstName'].value;
      this.data.lastName = this.signUpForm.controls['lastName'].value;
      this.data.mobNo = this.signUpForm.controls['mobNo'].value
      this.auth.SignUp(this.data).subscribe((res)=>{
        if(res.isError){
          this.signUpForm.reset;
          console.log(res.errorMessage);
        }
        else{
          console.log(res.result);
          this.route.navigateByUrl("/products");
        }
      });
      
      
    }
  }

}
