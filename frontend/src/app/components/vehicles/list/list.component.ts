import { Component, Injector, Inject } from '@angular/core';

import { BaseComponent } from '@shared/base.component';
import { Vehicle } from '@shared/index';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends BaseComponent {

  vehicles: Vehicle[];
  caminhoes: Vehicle[];
  carros: Vehicle[];
  motos: Vehicle[];

  constructor(@Inject(Injector) injector: Injector) {
    super(injector);
  }
  
  ngOnInit(): void {
    this.carregarVeiculos()
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