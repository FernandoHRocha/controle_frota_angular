import { Component, OnInit, Input, Injector, Inject } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';

import { BaseComponent } from '@shared/base.component';
import { Vehicle, Fuel } from '@shared/index';

@Component({
  selector: 'app-fuel-main-delete',
  templateUrl: './fuel-main-delete.component.html',
  styleUrls: ['./fuel-main-delete.component.css']
})
export class FuelMainDeleteComponent extends BaseComponent {

  hodometro: number = 0;
  volume: number;
  card: boolean = false;

  @Input() vehicle: Vehicle;
  
  abastecerForm: FormGroup;
  manutencaoForm: FormGroup;

  hodometroFormControl = new FormControl('',[Validators.required])
  fuelFormControl = new FormControl('',[Validators.required,Validators.min(0)])

  constructor(@Inject(Injector) injector: Injector, private fb: FormBuilder) {
    super(injector)
  }
  
  ngOnInit(): void {
    this.createForm()
    this.hodometro = this.vehicle.hodometro ? this.vehicle.hodometro : 0
    this.hodometroFormControl.setValidators(Validators.min(this.vehicle.hodometro))
  }

  createForm(){
    this.abastecerForm = this.fb.group({
      hodometro : [this.hodometro, Validators.required],
      volume : [null, Validators.required]
    })

    this.manutencaoForm = this.fb.group({
      hodometro: [this.hodometro, Validators.required],
      services: [null],
      date: [null]//adicionar as opções para a preventiva
    })

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