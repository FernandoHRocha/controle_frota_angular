import { Inject, Injectable, Injector, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { VehicleService,  SnackbarService, Fuel, Maintenance, Vehicle } from "@shared/index";

@Injectable()
export abstract class BaseComponent implements OnInit {
    
    route: Router;
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
    
    vehicleServicesToFuel(fuel: Fuel): void{
        this.getVehicleService().toFuel(fuel).subscribe(
            data => {
              this.getSnackService().popupBottom('Abastecimento Registrado')
              this.route.navigate(['/'])
            },
            error => {
              this.getSnackService().popupBottom('Erro ao comunicar com o servidor.')
            }
          )
    }
}