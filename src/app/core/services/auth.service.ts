import { IUserdata } from './../interfaces/Iuserdata';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { verify } from 'crypto';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // userdata!:IUserdata;
  userdata:any=null;
  private readonly _httpclient=inject(HttpClient);
private _Router = inject(Router);
  setregisterform(data:object):Observable<any> {
return this._httpclient.post(`${environment.baseurl}/api/v1/auth/signup`, data)
  }

  setloginform(data:object):Observable<any>{
    return this._httpclient.post(`${environment.baseurl}/api/v1/auth/signin`,data)
  }
  getuserdata():void {if(localStorage.getItem('usertoken') !== null){
    this.userdata =jwtDecode(localStorage.getItem('usertoken') ! )
    console.log("userdataa :" , this.userdata);

  }
    
  }
  // tfre8 el interface
clearuserdata():void {
    this.userdata = {
      id: '',
      name: '',
      role: '',
      iat: 0,
      exp: 0
    };
 

}
  logout():void {
    localStorage.removeItem('usertoken');
    this.userdata=this.clearuserdata()
this._Router.navigate(['/login']);

  }
  setEmailverify(data:object):Observable<any> {
return this._httpclient.post(`${environment.baseurl}/api/v1/auth/forgotPasswords`, data );
  }
  setCodeverify(data2:object):Observable<any> {
    return this._httpclient.post(`${environment.baseurl}/api/v1/auth/verifyResetCode`, data2 );
      }

   setresetpass(data3:object):Observable<any> {
    return this._httpclient.put(`${environment.baseurl}/api/v1/auth/resetPassword`, data3 );
      }
}


