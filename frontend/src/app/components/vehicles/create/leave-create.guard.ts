import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { CreateComponent } from './create.component'

export class LeaveCreateGuard implements CanDeactivate<CreateComponent> {

    canDeactivate(
        createComponent: CreateComponent,
        activatedRoute: ActivatedRouteSnapshot,
        routerState: RouterStateSnapshot): boolean {
            if(!createComponent.createComplete()) {
                return window.confirm('Deseja desistir da criação?')
            } else {
                return true
            }
    }
}