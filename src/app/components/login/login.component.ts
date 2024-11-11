import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule , NgClass , RouterLink , TranslateModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
private readonly _AuthService=inject(AuthService);
private readonly _FormBuilder=inject(FormBuilder);
private readonly _Router = inject(Router);
msgerr:string='';
msgsuccess:boolean=false;
isloading:boolean=false;
loginform:FormGroup=this._FormBuilder.group({
  email:[null , [Validators.required , Validators.email ]],
  password:[null , [Validators.required , Validators.pattern(/^\w{6,}$/)]],
 })

loginsubmit():void {
  if(this.loginform.valid){
this.isloading=true;
    console.log(this.loginform);
this._AuthService.setloginform(this.loginform.value).subscribe({
  next:(res)=>{
    this.msgsuccess=true;
    if(res.message=='success') {
      setTimeout(() => {
        localStorage.setItem('usertoken', res.token);
        this._AuthService.getuserdata();
        this._Router.navigate(['/home']);
      }, 1000);
    }

console.log(res);
this.isloading=false;

  },
  error:(err:HttpErrorResponse)=>{

    this.msgerr=err.error.message;
this.isloading=false;
console.log(err);
  }
})
  }

}




}
