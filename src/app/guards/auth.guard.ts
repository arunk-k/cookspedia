import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {

  const router=inject(Router)
  const toastr=inject(ToastrService)

  if(sessionStorage.getItem('token')){
    return true;
  }
  else{
    toastr.info("Please Login First!!")
    router.navigateByUrl('/')
    return false
  }
}
