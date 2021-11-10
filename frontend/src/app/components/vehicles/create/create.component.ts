import { Component, OnInit, Injector, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms"
import { BaseComponent } from '@shared/base.component';

import { Vehicle, RadioOption } from '@shared/index';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent extends BaseComponent implements OnInit {

  formulario: FormGroup;
  tipoControl: FormControl = new FormControl('',Validators.required);
  tiposVeiculo: RadioOption[] = [
    { label : 'Moto', value: 'Moto' },
    { label : 'Carro', value: 'Carro' },
    { label : 'Caminhão', value: 'Caminhao' },
  ];

  constructor(
    @Inject(Injector) injector: Injector,
    private fb: FormBuilder) {
    super(injector);
  }
    
  ngOnInit(): void {
    this.createForm()
  }

  createForm(){
    this.formulario = this.fb.group({
      frota : [null,Validators.required],
      placa : [null,Validators.required],
      hodometro : [null],
      manutencao : [null]
    });
  }

  onSubmit(){
    let result = this.formulario.value
    var veiculo: Vehicle = result;
    this.getVehicleService().insertVehicle(veiculo).subscribe(
      data => {
        console.log('data',data)
        this.getSnackService().popupBottom('Veículo inserido com sucesso.')
        this.formulario.reset()
        this.getRouterService().navigate('/frota')
      },
      error => {
        console.log('error',error)
        this.getSnackService().popupBottom('Erro ao inserir o veículo.')
      }
    )
  }
}
