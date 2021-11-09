import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms"

import { Vehicle, RadioOption } from '@shared/index';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  @Output() cancelar = new EventEmitter<void>()
  @Output() inserirVeiculo = new EventEmitter<Vehicle>()

  formulario: FormGroup;

  vehicles: Vehicle[];
  vehicle: Vehicle = {};

  tipoControl={ tipo: ['',Validators.required] };

  tiposVeiculo: RadioOption[] = [
    { label : 'moto', value: 'MOTO' },
    { label : 'carro', value: 'CARRO' },
    { label : 'caminhao', value: 'CAMINHAO' },
  ]

  constructor(private fb: FormBuilder) {}
    
  ngOnInit(): void {
    this.formulario = this.fb.group({
      frota: ['',Validators.required],
      placa: ['',Validators.required],
      hodometro: ['',],
      manutencao:['']
    });
  }
      
  inserirFrota(): void {
    //this.inserirVeiculo.emit(this.vehicle)
  }

  cancel(): void {
    //this.cancelar.emit()
  }

  onSubmit(form){
    console.log('HTML',form.value)
    console.log('FormGroup',this.formulario.value)
  }


}
