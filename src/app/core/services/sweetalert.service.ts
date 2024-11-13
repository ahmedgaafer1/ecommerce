import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class SweetalertService {

  constructor() { }
  successAlert(message: string) {
    Swal.fire('نجاح', message, 'success');
  }

  showSuccessTopEnd(message: string ) {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 1500,
       backdrop: false,                   
      toast: true  
    });
  }
  showalert(message:string , aftermsg:string , callback:()=>void){
    Swal.fire({
      title: "Are you sure?",
      text: message,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      
    }).then((result) => {
      if (result.isConfirmed) {
        callback();
        Swal.fire({
          title: "Deleted!",
          text: aftermsg,
          icon: "success"
          
        });
       
      }
    })
  }

  errorAlert(message: string) {
    Swal.fire('error', message, 'error');
  }

}
