import { DatePipe } from '@angular/common';
import { Component, OnInit, Input, Injector, Inject } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';

import { BaseComponent } from '@shared/base.component';
import { Vehicle, Fuel, RadioOption, Maintenance } from '@shared/index';

@Component({
  selector: 'app-fuel-main-delete',
  templateUrl: './fuel-main-delete.component.html',
  styleUrls: ['./fuel-main-delete.component.css']
})
export class FuelMainDeleteComponent extends BaseComponent {
  
  @Input() vehicle: Vehicle;

  hodometro: number = 0;
  volume: number;
  card: boolean = false;
  
  abastecerFormGroup: FormGroup;
  manutencaoFormGroup: FormGroup;
  manutencaoFormControl: FormControl = new FormControl('',Validators.required);
  tiposManutencao: RadioOption[] = [
    { label : 'Preventiva', value : 'Preventiva' },
    { label : 'Corretiva', value : 'Corretiva' }
  ];

  constructor(@Inject(Injector) injector: Injector, private fb: FormBuilder, private datepipe: DatePipe) {
    super(injector)
  }
  
  ngOnInit(): void {
    this.createForm()
  }
  
  createForm(){
    this.abastecerFormGroup = this.fb.group({
      hodometro : [this.vehicle.hodometro, [Validators.required,Validators.min(this.vehicle.hodometro)]],
      volume : [null, [Validators.required, Validators.min(1)]]
    })

    this.manutencaoFormGroup = this.fb.group({
      ihodometro : [this.hodometro, [Validators.required,Validators.min(this.vehicle.hodometro)]],
      servicos : [null],
      data : [null, [Validators.required]],
      tipo : [null, [Validators.required]]
      //adicionar as opções para a preventiva
    })

  }

  manutencaoFrota(): void{
    let entradas =  this.manutencaoFormGroup.value
    console.log(this.datepipe.transform(entradas.data,'dd/MM/YYYY'))
/*    let manutencao : Maintenance = {
      idVehicle : this.vehicle.id,
      hodometro : entradas.ihodometro,
      services : entradas.iservices,
      tipo : entradas.itipo,
      date : entradas.idata.toString().substr(0,10)
    }
    console.log(manutencao)*/
  }

  abastecerFrota(): void{
    let fuel: Fuel = {
      hodometro : this.hodometro,
      volume : this.volume,
      idVehicle : this.vehicle.id
    };
    this.getVehicleService().toFuel(fuel).subscribe(
      data => {
        this.getSnackService().popupBottom('Frota abastecido!')
        this.ngOnInit()
      }, error => {
        this.getSnackService().popupBottom('Erro ao comunicar com o servidor.')
      }
    )
  }

}