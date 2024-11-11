import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule , NgClass , TranslateModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private readonly _authservices=inject(AuthService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _Router = inject(Router);
  msgerr:string="";
  isloading:boolean=false;
  msgsuccess:boolean=false;

//===>>>>  Old syntax 

// registerform:FormGroup = new FormGroup({
//   name: new FormControl(null , [ Validators.required , Validators.minLength(3),Validators.maxLength(20)]),
//   email: new FormControl(null, [Validators.required , Validators.email ]),
//   password: new FormControl(null , [Validators.required , Validators.pattern(/^\w{6,}$/)]),
//   rePassword: new FormControl(null), 
//   phone: new FormControl(null, [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]),
// }, this.confirmpassword)

// new syntax
registerform:FormGroup = this._FormBuilder.group({
  name:[null , [Validators.required , Validators.minLength(3),Validators.maxLength(20) ]] ,
  email:[null , [Validators.required , Validators.email ]],
  password:[null , [Validators.required , Validators.pattern(/^\w{6,}$/)]],
  rePassword:[null],
  phone:[null , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]],

}, {validators:this.confirmpassword});

confirmpassword(g : AbstractControl) {

  if (g.get('password')?.value == g.get('rePassword')?.value){
return null ;
  }
  else {
    return {
      mismatch:true
    }
  }
}

registersubmit():void{
  if(this.registerform.valid){
this.isloading=true;
    this._authservices.setregisterform(this.registerform.value).subscribe({
      next:(res)=>{
console.log(res);
this.msgsuccess=true;
if(res.message=='success'){
  setTimeout(() => {
  this._Router.navigate(['/login']);
    
  }, 1000);
}
this.isloading=false;


      },
      error:(err:HttpErrorResponse)=>{
this.msgerr=err.error.message;
console.log(err);
this.isloading=false;

      }
    })
  } 
  else{
this.registerform.setErrors({mismatch:true})
this.registerform.markAllAsTouched();

  }
}

// mtnsa4 ngdestroy t7ot feha cleartimeout
}
