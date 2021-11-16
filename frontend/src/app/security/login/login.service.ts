import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

import { FROTA_API } from "src/app/app.api";
import { User } from "./user.model";

@Injectable()
export class LoginService {

    user:User;

    constructor(
        private http: HttpClient,
        private route: Router) {
    }

    isLoggedIn(): boolean{
        return this.user !== undefined
    }

    login(email: string, password: string): Observable<User>{
        return this.http.post<User>(
            FROTA_API+'/login',
            {
                email: email,
                password: password
            }
        ).pipe(
            tap(user => this.user = user)
        )
    }

    handleLogin(path?: string) {
        this.route.navigate(['/login', btoa(path)])
    }
}