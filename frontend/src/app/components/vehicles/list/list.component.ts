import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Vehicle } from '@shared/index';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Output('abastecerFrota') abastecerVeiculo = new EventEmitter<Vehicle>()
  @Output('manutencaoFrota') manutencaoVeiculo = new EventEmitter<Vehicle>()
  @Output('excluirFrota') excluirVeiculo = new EventEmitter<Vehicle>()
  
  gas: boolean = false;
  manutencao: boolean = false;
  excluir: boolean = false;
  card: boolean = false;
  panelOpenState = false;
  
  @Input() vehicle: Vehicle;


  constructor() {}
  
  ngOnInit(): void {
  }

  setGas = (value: boolean) => {this.gas = value}
  setManutencao = (value: boolean) => {this.manutencao = value}
  setExcluir = (value: boolean) => {this.excluir = value}
  setCard = (value: boolean) => {this.card = value}

  abastecerFrota(){
    this.abastecerVeiculo.emit(this.vehicle)
  }

  manutencaoFrota(){
    this.manutencaoVeiculo.emit(this.vehicle)
  }

  excluirFrota(){
    this.excluirVeiculo.emit(this.vehicle)
  }

}
