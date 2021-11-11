import { Inject, Injectable, Injector, OnInit } from "@angular/core";

import { VehicleService,  SnackbarService, RoutingService } from "@shared/index";

@Injectable()
export abstract class BaseComponent implements OnInit {
    
    constructor(@Inject(Injector) private injector: Injector) {
    }

    ngOnInit(): void {
    }
    
    getVehicleService(): VehicleService {
        return this.injector.get(VehicleService);
    }
    
    getSnackService(): SnackbarService {
        return this.injector.get(SnackbarService);
    }

    getRouterService(): RoutingService{
        return this.injector.get(RoutingService);
    }

    numberValidationPattern(): any{
        return /^[0-9]*$/
    }
}