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
        this.snack('Aconteceu um erro ao se conectar ao servidor.')
      }
    )
  }

  snack(msg:string): void{
    this.snackBar.middleBottom(msg)
  }
  
  rotaAdicionarVeiculo(): void {
    this.router.navigate(['/frota/create'])
  }

  adicionarVeiculo(vehicle: Vehicle): void{
    this.vehicleService.getVehicles().subscribe(
      data => {
        this.vehicles = data
        vehicle.id = this.vehicles.length
        let msg = "Frota " + vehicle.frota + " adicionado com sucesso."
        this.snack(msg)
      },
      error => {
        this.snack('Não foi possível adicionar.')
    })
    this.router.navigate(['/frota'])
  }

  excluirVeiculo(vehicle: Vehicle): void{
    this.vehicleService.deleteVehicle(vehicle).subscribe(
      data => {
        this.snack('O veículo frota '+vehicle.frota+' foi removido com sucesso.')
      },
      error => {
        this.snack('Erro ao comunicar ao servidor.')
      }
    )
    this.ngOnInit()
  }

  abastecerVeiculo(vehicle: Vehicle): void{

  }

  manutencaoVeiculo(vehicle: Vehicle): void{

  }
}
