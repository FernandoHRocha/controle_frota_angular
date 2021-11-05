import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { Vehicle } from '@shared/index';
import { VehicleService } from '@shared/vehicle.service';
import { SnackbarService } from '@shared/snackbar.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {
  
  vehicles: Vehicle[];

  constructor(
    private router: Router,
    private vehicleService: VehicleService,
    private snackBar: SnackbarService) { }
  
  ngOnInit(): void {
    this.vehicleService.getVehicles().subscribe(
      data => {
        this.vehicles = data
      },
      error => {
        this.vehicles = []
        this.snackBar.middleBottom('Aconteceu um erro ao se conectar ao servidor.')
      }
    )
  }
  
  adicionarVeiculo(): void {
    this.router.navigate(['/vehicle/create'])
  }
}
