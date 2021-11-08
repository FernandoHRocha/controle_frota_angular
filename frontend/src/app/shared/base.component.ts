import { Inject, Injectable, Injector, OnInit } from "@angular/core";

import { VehicleService,  SnackbarService, Fuel, Maintenance, Vehicle } from "@shared/index";
import { Observable, Subject } from "rxjs";

@Injectable()
export abstract class BaseComponent implements OnInit {
    
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
    
    vehicleServicesToFuel(fuel: Fuel): Observable<boolean>{
      let retorno = new Subject<boolean>();
        this.getVehicleService().toFuel(fuel).subscribe(
            data => {
              retorno.next(true);
              retorno.complete()
            },
            error => {
              retorno.next(false);
              retorno.complete()
            }
          )
      return retorno.asObservable()
    }
}