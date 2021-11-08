import { Component, OnInit, Input, Output, EventEmitter, Injector, Inject } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { BaseComponent } from '@shared/base.component';
import { Vehicle, Fuel } from '@shared/index';

@Component({
  selector: 'app-fuel-main-delete',
  templateUrl: './fuel-main-delete.component.html',
  styleUrls: ['./fuel-main-delete.component.css']
})
export class FuelMainDeleteComponent {

  @Output() abastecerVeiculo = new EventEmitter<Fuel>();

  hodometro: number = 0;
  volume: number;
  estadoAbastecer: boolean = false;
  estadoManutencao: boolean = false;
  estadoExcluir: boolean = false;
  card: boolean = false;

  @Input() vehicle: Vehicle;
  
  hodometroFormControl = new FormControl('',[Validators.required])
  fuelFormControl = new FormControl('',[Validators.required,Validators.min(0)])

  constructor() {
  }
  
  ngOnInit(): void {
    this.hodometro = this.vehicle.odometro ? this.vehicle.odometro : 0
    this.hodometroFormControl.setValidators(Validators.min(this.vehicle.odometro))
  }

  abastecerFrota(): void{
    let fuel: Fuel = {
      odometro : this.hodometro,
      volume : this.volume,
      idVehicle : this.vehicle.id
    };
    this.abastecerVeiculo.emit(fuel)
  }

}