import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { Vehicle, RadioOption } from '@shared/index';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  @Output() cancelar = new EventEmitter<void>()
  @Output() inserirVeiculo = new EventEmitter<Vehicle>()
  vehicles: Vehicle[];
  vehicle: Vehicle = {};

  tiposVeiculo: RadioOption[] = [
    { label : 'moto', value: 'MOTO' },
    { label : 'carro', value: 'CARRO' },
    { label : 'caminhao', value: 'CAMINHAO' },
  ]
  escolharadio: string;
  tipoVeiculo: string;

  constructor(private router: Router) {}
    
  ngOnInit(): void {
  }
      
  inserirFrota(): void {
    console.log(this.escolharadio)
    //this.inserirVeiculo.emit(this.vehicle)
  }

  cancel(): void {
    this.cancelar.emit()
  }

  onSubmit(form){
    console.log('formulario')
    console.log(form)
  }

  setOption($event){
    this.escolharadio = $event
  }

}
