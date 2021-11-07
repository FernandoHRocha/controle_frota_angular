import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Vehicle, Fuel } from '@shared/index';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  
  @Output('abastecerFrota') abastecerVeiculo = new EventEmitter<Vehicle>()
  @Output('manutencaoFrota') manutencaoVeiculo = new EventEmitter<Vehicle>()
  @Output('excluirFrota') excluirVeiculo = new EventEmitter<Vehicle>()
  
  hodometro: number = 0;
  volume: number;
  estadoAbastecer: boolean = false;
  estadoManutencao: boolean = false;
  estadoExcluir: boolean = false;
  card: boolean = false;

  @Input() vehicle: Vehicle;

  
  hodometroFormControl = new FormControl('',[Validators.required])
  fuelFormControl = new FormControl('',[Validators.required,Validators.min(0)])

  constructor() {}
  
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
    this.abastecerVeiculo.emit(fuel)
  }

  manutencaoFrota(){
    this.manutencaoVeiculo.emit(this.vehicle)
  }

  excluirFrota(){
    this.excluirVeiculo.emit(this.vehicle)
  }

}
