import { Component, Injector, Inject } from '@angular/core';
import { animate, trigger, state, style, transition, query, stagger, keyframes } from '@angular/animations';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'

import { BaseComponent } from '@shared/base.component';
import { Vehicle } from '@shared/index';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  animations: [
    trigger('toggleSearch',[
      state('hidden', style({'opacity': '0',"max-height": '0'})),
      state('visible',style({'opacity':'1','max-height':'90px'})),
      transition('* => *', animate('0.3s 0s ease-in-out'))
    ]),
    trigger('enterCards',[
      transition('* => *', [
        query(':enter',style({ opacity: 0}), { optional: true }),
        query('.expansion', style({ 'max-height':'48px'}), { optional: true }),
        query(':enter', stagger('50ms',[
          animate('0.15s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-30px)', offset: 0}),
            style({opacity: 0.5, transform: 'translateY(15px)', offset: 0.3}),
            style({opacity: 1, transform: 'translateY(0)', offset: 1}),
          ]))
        ]), { optional: true })
      ])
    ])
  ]
})
export class ListComponent extends BaseComponent {

  searchBarStateCaminhao = 'hidden'
  searchBarStateCarro = 'hidden'
  searchBarStateMoto = 'hidden'

  vehicles: Vehicle[] = [];
  caminhoes: Vehicle[] = [];
  carros: Vehicle[] = [];
  motos: Vehicle[] = [];

  searchForm: FormGroup;
  searchControl: FormControl

  constructor(
    private fb: FormBuilder,
    @Inject(Injector) injector: Injector) {
    super(injector);
  }
  
  ngOnInit(): void {
    this.carregarVeiculos()
    this.carregarForms()
  }

  carregarVeiculos(){
    this.getVehicleService().getVehicles().subscribe(
      data => {
        this.vehicles = data;
        this.caminhoes = data.filter(filtrarCaminhoes)
        this.carros = data.filter(filtrarCarros)
        this.motos = data.filter(filtrarMotos)
      },
      error => {
        this.getSnackService().popupBottom('Erro ao carregar a frota.')
      }
    )
  }

  carregarForms(){
    this.searchControl = this.fb.control('')
    this.searchForm = this.fb.group({
      truckControl : [''],
      carControl : [''],
      bikeControl : ['']
    })

    this.searchForm.get('truckControl').valueChanges.subscribe(
      searchTerm => {
        this.getVehicleService().getFrota('Caminhao',searchTerm).subscribe(
          data => this.caminhoes = data
        )
      }
    )
    this.searchForm.get('carControl').valueChanges.subscribe(
      searchTerm => {
        this.getVehicleService().getFrota('Carro',searchTerm).subscribe(
          data => this.carros = data
        )
      }
    )
    this.searchForm.get('bikeControl').valueChanges.subscribe(
      searchTerm => {
        this.getVehicleService().getFrota('Moto',searchTerm).subscribe(
          data => this.motos = data
        )
      }
    )
  }

}

function filtrarCaminhoes (veiculo) {
  if (veiculo.tipo === 'Caminhao'){
    return veiculo
  }
}
function filtrarCarros (veiculo) {
  if (veiculo.tipo === 'Carro'){
    return veiculo
  }
}
function filtrarMotos (veiculo) {
  if (veiculo.tipo === 'Moto'){
    return veiculo
  }
}