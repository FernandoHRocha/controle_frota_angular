import { DatePipe } from '@angular/common';
import { Component, OnInit, Input, Injector, Inject } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';

import { BaseComponent, Vehicle, Fuel, Maintenance } from '@shared/index';
import { CustomValidators } from '@shared/validators/customValidators';

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
  tiposManutencao: object[] = [
    { label : 'Preventiva', value : 'Preventiva' },
    { label : 'Corretiva', value : 'Corretiva' }
  ];

  constructor(
    @Inject(Injector) injector: Injector,
    private fb: FormBuilder,
    private customValidators: CustomValidators,
    private datepipe: DatePipe) {
      super(injector)
  }
  
  ngOnInit(): void {
    this.createForm()
  }
  
  createForm(){
    this.abastecerFormGroup = this.fb.group({
      hodometro : this.fb.control(this.vehicle.hodometro, [Validators.required,Validators.pattern(this.numberValidationPattern()),Validators.min(this.vehicle.hodometro)]),
      volume : [null, [Validators.required,Validators.pattern(this.numberValidationPattern()), Validators.min(1)]]
    },
    {
      validators: [this.customValidators.mediaRazoavel(this.vehicle.hodometro)]
    })

    this.manutencaoFormGroup = this.fb.group({
      hodometro : [this.vehicle.hodometro, [Validators.required,Validators.pattern(this.numberValidationPattern()),Validators.min(this.vehicle.hodometro)]],
      servicos : [null, [Validators.required]],
      data : [null, [Validators.required]],
      tipo : [null, [Validators.required]]
    })
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
    console.log('manutencao',manutencao)
  }

  abastecerFrota(): void{
    let fuel: Fuel = {
      hodometro : this.hodometro,
      volume : this.volume,
      idVehicle : this.vehicle.id
    };
    console.log('abastecer',fuel)
    this.getVehicleService().toFuel(fuel).subscribe(
      data => {
        this.getSnackService().popupBottom('Frota abastecido!')
        this.ngOnInit()
      }, error => {
        this.getSnackService().popupBottom('Erro ao comunicar com o servidor.')
      }
    )
  }

  excluirFrota(): void {
    console.log('excluir',this.vehicle)
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