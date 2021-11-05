import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Vehicle } from '@shared/index';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  gas: boolean = false;
  manutencao: boolean = false;
  excluir: boolean = false;
  card: boolean = false;
  @Input()vehicle: Vehicle;

  constructor() {}
  
  ngOnInit(): void {
  }

  setGas = (value: boolean) => {this.gas = value}
  setManutencao = (value: boolean) => {this.manutencao = value}
  setExcluir = (value: boolean) => {this.excluir = value}
  setCard = (value: boolean) => {this.card = value}

  abastecerFrota(){
    console.log("abastecer o frota ", this.vehicle.frota)
  }

  manutencaoFrota(){
    console.log("Manutenção para o frota ", this.vehicle.frota)
  }

  excluirFrota(){
    console.log("Exclusão para o frota ", this.vehicle.frota)
  }

}
