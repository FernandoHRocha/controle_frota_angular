import { Injectable } from "@angular/core";
import { CanLoad, Route, Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { LoginService } from "./login/login.service";

@Injectable()
export class LoggedinGuard implements CanLoad, CanActivate {

    constructor(
        private loginService: LoginService,
        private router: Router) {

    }

    checkAuthentication(path: string): boolean {
        const loggedIn: boolean = this.loginService.isLoggedIn();
        if(!loggedIn) {
            this.loginService.handleLogin(`/${path}`)
        }
        return loggedIn
    }

    canLoad(route: Route): boolean {
        console.log('Load', route.path)
        return this.checkAuthentication(route.path)
    }
    
    canActivate(activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): boolean{
        console.log('Activate',activatedRoute.routeConfig.path)
        return this.checkAuthentication(activatedRoute.routeConfig.path)
    }
}