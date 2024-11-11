import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const logedGuard: CanActivateFn = (route, state) => {
const _router = inject(Router);
if(typeof localStorage !=='undefined'){
  if(localStorage.getItem('usertoken') !== null ) {
    _router.navigate(['/home'])
    return false
  }
  else {
    return true;
  }

}
else{
  return false ;
}

};
