import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { credencialServiceUrl } from '../../config/credecial';
import { AuthUser } from '../../models/auth-user.model';
import { LoginResponse } from '../../models/loginRes.model';
import { Response } from '../../models/response.model';
import { SignUp } from '../../models/sign-up.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authUser = new Subject<AuthUser>();
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient) { }
 
  Login(email:string, password: string) : Observable<any>
  {
    return this.http.get<Response<LoginResponse>>(credencialServiceUrl.login(email,password)).pipe(
      tap(res =>{
          const expirationDate = new Date(new Date().getTime() + +res.result.expiresIn * 1000)
          const authUser = new AuthUser(
            res.result.token,
            expirationDate
            );
            this.authUser.next(authUser);
            this.autoLogOut(res.result.expiresIn * 60 * 1000); 
      })
    );
  }

  LogOut(){
    this.authUser.next({
      _token : '',
      _tokenExpirationDate : new Date(),
      token: null
    });
    debugger;
    localStorage.removeItem('token');
    localStorage.removeItem('expiresIn');
    localStorage.removeItem('userRole');
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null; 
  }

  autoLogOut(expirationDuration: number){  
    console.log(expirationDuration);
    this.tokenExpirationTimer = setTimeout(()=>{
      this.LogOut();
    }, expirationDuration)
  }


  SignUp(data: SignUp) : Observable<any>{
    return this.http.post<Response<string>>(credencialServiceUrl.signUp(),data)
  }

  getRole(): Observable<any>{
      return this.http.get<Response<number>>(credencialServiceUrl.getUserRole());
  }
}
