import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  chnagePasswordForm: FormGroup;
  submitted:boolean = false;
  constructor(private auth: AuthService, public router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(){
    this.chnagePasswordForm = new FormGroup({
      email: new FormControl('',[Validators.required]),
      old_password: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required]),
      confPassword : new FormControl('',[Validators.required])
    })
  }
  get f(){
    return this.chnagePasswordForm.controls;
  }


  submit(){
    this.submitted = true;
    if(this.chnagePasswordForm.invalid){
      this.chnagePasswordForm.markAsTouched();
      return;
    }
    else{
      let email = this.chnagePasswordForm.controls['email'].value;
      let old_password = this.chnagePasswordForm.controls['old_password'].value;
      let password = this.chnagePasswordForm.controls['password'].value;
      let confpassword = this.chnagePasswordForm.controls['confPassword'].value;
      if(password != confpassword){
        return;
      }
      else{
        this.auth.changePassword(email,old_password,password).subscribe(res=>{
          if(res.isError){
            console.log(res.errorMessage);
          }
          else{
            //popup
            this.router.navigateByUrl('/products');
          }
        })
      }
    }
  }

}
