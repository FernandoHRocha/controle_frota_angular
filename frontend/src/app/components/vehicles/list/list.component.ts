import { Component, OnInit, Input, Output, EventEmitter, Injector, Inject } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';

import { BaseComponent } from '@shared/base.component';
import { Vehicle, Fuel } from '@shared/index';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends BaseComponent {
  
  @Output('manutencaoFrota') manutencaoVeiculo = new EventEmitter<Vehicle>()
  @Output('excluirFrota') excluirVeiculo = new EventEmitter<Vehicle>()
  
  hodometro: number = 0;
  volume: number;
  estadoAbastecer: boolean = false;
  estadoManutencao: boolean = false;
  estadoExcluir: boolean = false;
  card: boolean = false;

  @Input() vehicle: Vehicle;

  form: FormGroup;
  hodometroFormControl = new FormControl('',[Validators.required])
  fuelFormControl = new FormControl('',[Validators.required,Validators.min(0)])

  constructor(@Inject(Injector) injector: Injector) {
    super(injector);
  }
  
  ngOnInit(): void {
    this.hodometro = this.vehicle.odometro
    this.hodometroFormControl.setValidators(Validators.min(this.vehicle.odometro))
  }

  abastecerFrota(){
    let fuel: Fuel = {
      odometro : this.hodometro,
      volume : this.volume,
      idVehicle : this.vehicle.id
    };
    this.vehicleServicesToFuel(fuel)
  }

  manutencaoFrota(){
    this.manutencaoVeiculo.emit(this.vehicle)
  }

  excluirFrota(){
    this.excluirVeiculo.emit(this.vehicle)
  }

}
