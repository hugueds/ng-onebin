import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, } from '@angular/router';

import { Observable } from "rxjs/Observable";



@Injectable()

export class DeviceGuard implements CanActivate {

    constructor(private _router: Router) { }
    
    
    // Verifica se o dispositivo possui todas as configuracoes
    // 

    canActivate(route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
            return false;
        //let configuration = this
        //if (this.)
    }


}