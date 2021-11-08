import { Component, OnInit, Input, Output, EventEmitter, Injector, Inject } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { BaseComponent } from '@shared/base.component';
import { Vehicle, Fuel } from '@shared/index';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends BaseComponent {

  hodometro: number = 0;
  volume: number;
  estadoAbastecer: boolean = false;
  estadoManutencao: boolean = false;
  estadoExcluir: boolean = false;
  card: boolean = false;

  vehicles: Vehicle[];

  form: FormGroup;
  hodometroFormControl = new FormControl('',[Validators.required])
  fuelFormControl = new FormControl('',[Validators.required,Validators.min(0)])

  constructor(@Inject(Injector) injector: Injector, private router: Router) {
    super(injector);
  }
  
  ngOnInit(): void {
    this.getVehicleService().getVehicles().subscribe(
      data => {
        this.vehicles = data
      },
      error => {
        this.getSnackService().popupBottom('Erro ao carregar a frota.')
      }
    )
  }

  abastecerFrota(fuel: Fuel){
    if (this.vehicleServicesToFuel(fuel)) {
      this.getSnackService().popupBottom('Frota abastecido!')
      this.vehicles=[]
      this.ngOnInit()
    } else {
      this.getSnackService().popupBottom('Erro ao comunicar com o servidor.')
    }
  }
}
