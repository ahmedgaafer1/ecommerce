import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-forgot',
  standalone: true,
  imports: [ReactiveFormsModule ],
  templateUrl: './forgot.component.html',
  styleUrl: './forgot.component.scss'
})
export class ForgotComponent {
private readonly _FormBuilder = inject(FormBuilder);
private readonly _AuthService = inject(AuthService);
private readonly _Router = inject(Router);
step:number=1;
  verifyemail:FormGroup = new FormGroup({
    email: new FormControl(null , [Validators.required ,  Validators.email])
  })
    verifycode:FormGroup = new FormGroup({
      resetCode: new FormControl(null , [Validators.required , Validators.pattern(/^[0-9]{6}$/)] ),
    })

    resetPassword:FormGroup = this._FormBuilder.group({
      email:[null, [Validators.required , Validators.email]],
      newPassword:[null, [Validators.required , Validators.pattern(/^\w{6,}$/)]]
      
    })

    setverifyemail():void {
      // let emailvalue = this.verifyemail.get('email')?.value;
      this.resetPassword.get('email')?.patchValue(this.verifyemail.get('email')?.value);
this._AuthService.setEmailverify(this.verifyemail.value).subscribe({
  next:(res)=>{
console.log(res);
if(res.statusMsg == 'success'){
this.step=2;
}

  },
  error:(err)=>{
console.log(err);
  }
})
    }
    seetverifycode():void {
      this._AuthService.setCodeverify( this.verifycode.value ).subscribe({
        next:(res)=>{
      console.log(res);
      if(res.status == 'Success'){
      this.step= 3;
      }
      
        },
        error:(err)=>{
      console.log(err);
        }
      })
          }

          setnewpassword():void {
            this._AuthService.setresetpass(this.resetPassword.value).subscribe({
              next:(res)=>{
            console.log(res);
              localStorage.setItem('usertoken',res.token);
        this._AuthService.getuserdata();
        this._Router.navigate(['/home']);


         
            
              },
              error:(err)=>{
            console.log(err);
              }
            })
                }
}
