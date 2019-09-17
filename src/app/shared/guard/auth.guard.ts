
import { Injectable, OnInit } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
// import { CookieService } from 'ngx-cookie';
@Injectable()
export class AuthGuard implements CanActivate  {
    constructor(private router: Router,
        // private _cookieService : CookieService
        ) {
     
    }

    canActivate() {
       // console.log(this._cookieService.get('isLoggedIn'))
        if (localStorage.getItem('isLoggedin')) {
            return true;
        }

        // if(this._cookieService.get('isLoggedIn') === 'yes'){
        //  //   console.log('cookie present')
        //     return true;
        // }

        this.router.navigate(['/authentication/newlogin']);
        return false;
    }

 
}
