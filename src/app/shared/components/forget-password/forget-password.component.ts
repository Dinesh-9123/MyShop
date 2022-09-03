import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  forgetPasswordForm: FormGroup;
  submitted:boolean = false;
  constructor(private auth:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(){
    this.forgetPasswordForm = new FormGroup({
      email: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required]),
      confPassword : new FormControl('',[Validators.required])
    })
  }
  get f(){
    return this.forgetPasswordForm.controls;
  }


  submit(){
    this.submitted = true;
    if(this.forgetPasswordForm.invalid){
      this.forgetPasswordForm.markAsTouched();
      return;
    }
    else{
      let email = this.forgetPasswordForm.controls['email'].value;
      let password = this.forgetPasswordForm.controls['password'].value;
      let confpassword = this.forgetPasswordForm.controls['confPassword'].value;
      if(password != confpassword){
        return;
      }
      else{
        this.auth.forgetPassword(email,password).subscribe(res=>{
          if(res.isError){
            console.log(res.errorMessage);
          }
          else{
            this.router.navigateByUrl('/auth');
          }
        })
      }
    }
  }

}
