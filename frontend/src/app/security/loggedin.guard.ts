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
        return this.checkAuthentication(route.path)
    }
    
    canActivate(activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): boolean{
        return this.checkAuthentication(activatedRoute.routeConfig.path)
    }
}