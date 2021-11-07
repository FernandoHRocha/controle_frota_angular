import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { Vehicle, VehicleService } from '@shared/index';
import { ListComponent, CreateComponent } from '@components/index';
import { SnackbarService } from '@shared/snackbar.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {
  
  vehicles: Vehicle[];
  operacao: string = "listar";

  constructor(
    public router: Router,
    private vehicleService: VehicleService,
    private snackBar: SnackbarService) { }
  
  ngOnInit(): void {
    console.log('atualizando')
    this.operacao = 'listar'
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
    this.operacao = 'criar';
  }

  adicionarVeiculo(vehicle: Vehicle): void{
    this.vehicleService.getVehicles().subscribe(
      data => {
        this.vehicles = data
        this.vehicleService.insertVehicle(vehicle).subscribe(
          data => {
            this.snack("Frota " + vehicle.frota + " adicionado com sucesso.")
            this.ngOnInit()
          },
          error => {
            this.snack("Não foi possível adicionar uma nova Frota.")
          }
        )
      },
      error => {
        this.snack('Sem comunicação com o servidor.')
    })
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
    this.snack('Abastecer veículo')
  }

  manutencaoVeiculo(vehicle: Vehicle): void{
    this.snack('Manutenção veículo')
  }
}
