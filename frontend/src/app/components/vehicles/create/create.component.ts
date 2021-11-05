import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { VehicleService, Vehicle } from '@shared/index';
import { SnackbarService } from '@shared/snackbar.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  vehicles: Vehicle[];
  vehicle: Vehicle = {
    frota:0,
    placa:'',
    odometro:0,
    manutencao:0
  };

  constructor(private vehicleService : VehicleService,
    private snackBar : SnackbarService,
    private router: Router) {}
    
  ngOnInit(): void {
  }

  getVehicles(){
    this.vehicleService.getVehicles().subscribe(
      data => {
        this.vehicles = data
        this.vehicle.id = this.vehicles.length
        let msg = "frota " + this.vehicle.frota + " id " + this.vehicle.id
        this.snackBar.middleBottom(msg)
      },
      error => {
        this.snackBar.middleBottom(error.toString())
    })
  }
      
  insertVehicle(): void {
    this.vehicleService.insertVehicle(this.vehicle).subscribe(
      data => {
      let msg = 'Veículo inserido com sucesso.'
      this.snackBar.middleBottom(msg)
    },
    error => {
      let msg = 'Erro ao inserir o veículo.'
      this.snackBar.middleBottom(msg)
      console.log(error)
    }
    )
  }

  cancel(): void {
    this.router.navigate(["/frota"])
  }

}
