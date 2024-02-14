import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "./login/login.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private loginService: LoginService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        if(this.loginService.isLoggedIn()) {
            const authRequest = request.clone(
                {
                    setHeaders:
                    {
                        'Authorization': `Bearer ${this.loginService.user.accessToken}`
                    }
                }
            )
            return next.handle(authRequest)
        }else{
            return next.handle(request)
        }
    }
}