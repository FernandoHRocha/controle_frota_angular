import { Inject, Injectable, Injector, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { VehicleService,  SnackbarService, Fuel, Maintenance, Vehicle } from "@shared/index";
import { Observable, Subject } from "rxjs";

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
}