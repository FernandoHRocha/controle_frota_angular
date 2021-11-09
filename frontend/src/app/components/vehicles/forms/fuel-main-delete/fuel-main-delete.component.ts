import { DatePipe } from '@angular/common';
import { Component, OnInit, Input, Injector, Inject } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';

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
  deletePanel: boolean = false;
  
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
      hodometro : [this.vehicle.hodometro, [Validators.required,Validators.pattern(this.numberValidationPattern()),Validators.min(this.vehicle.hodometro)]],
      volume : [null, [Validators.required,Validators.pattern(this.numberValidationPattern()), Validators.min(1)]]
    },
    {validators: this.mediaRazoavel})

    this.manutencaoFormGroup = this.fb.group({
      hodometro : [this.vehicle.hodometro, [Validators.required,Validators.pattern(this.numberValidationPattern()),Validators.min(this.vehicle.hodometro)]],
      servicos : [null, [Validators.required]],
      data : [null, [Validators.required]],
      tipo : [null, [Validators.required]]
    })
  }

  mediaRazoavel(group: AbstractControl): {[key:string]: boolean} {
    const hodometro:number = parseFloat(group.get('hodometro').value)
    const volume:number = parseFloat(group.get('volume').value)
    console.log('validador',hodometro)
    console.log('validador',volume)
    if (!hodometro || !volume){
      return undefined
    }
    const media = ((hodometro - this.vehicle.hodometro) / volume)
    console.log('validador',media)
    if( media < 0.5 || media > 35 ){
      return {mediaInviavel:true}
    }
    return undefined 

  }

  manutencaoFrota(): void{
    let entradas =  this.manutencaoFormGroup.value
    let manutencao : Maintenance = {
      idVehicle : this.vehicle.id,
      hodometro : entradas.hodometro,
      services : entradas.servicos,
      tipo : entradas.tipo,
      date : this.datepipe.transform(entradas.data,'dd/MM/YYYY')
    }
  }

  /*abastecerFrota(): void{
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
  }*/
  abastecerFrota(){
    console.log(this.abastecerFormGroup)
  }

  excluirFrota(): void {
    this.getVehicleService().deleteVehicle(this.vehicle).subscribe(
      data => {
        this.getSnackService().popupBottom('O veículo foi removido da sua frota.')
        this.ngOnInit()
      },
      error => {
        this.getSnackService().popupBottom('Error ao conectar ao servidor.')
      }
    )
  }

}