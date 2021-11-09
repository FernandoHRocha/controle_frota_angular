import { Inject, Injectable, Injector, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { VehicleService,  SnackbarService } from "@shared/index";

@Injectable()
export abstract class BaseComponent implements OnInit {
    
    private router: Router;

    constructor(@Inject(Injector) private injector: Injector) {
    }

    ngOnInit(): void {
    }
    
    getVehicleService(): VehicleService {
        return this.injector.get(VehicleService)
    }
    
    getSnackService(): SnackbarService {
        return this.injector.get(SnackbarService)
    }

    numberValidationPattern(): any{
        return /^[0-9]*$/
    }
}