import { Component, Inject, Injector, OnInit } from '@angular/core';

import { Vehicle, BaseComponent } from '@shared/index';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent extends BaseComponent implements OnInit {
  
  vehicles: Vehicle[];
  operacao: string = "listar";

  constructor(@Inject(Injector) injector: Injector) {
    super(injector)
  }
  
  ngOnInit(): void {
    this.operacao = 'listar'
    this.getVehicleService().getVehicles().subscribe(
      data => {
        this.vehicles = data
      },
      error => {
        this.vehicles = []
        this.getSnackService().popupBottom('Aconteceu um erro ao se conectar ao servidor.')
      }
    )
  }
}
