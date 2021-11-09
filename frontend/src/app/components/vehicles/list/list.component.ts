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

  constructor(@Inject(Injector) injector: Injector) {
    super(injector);
  }
  
  ngOnInit(): void {
    this.getVehicleService().getVehicles().subscribe(
      data => {
        this.vehicles = data
      },
      error => {
        this.getSnackService().popupBottom('Erro ao carregar a frota.')
      }
    )
  }
}
