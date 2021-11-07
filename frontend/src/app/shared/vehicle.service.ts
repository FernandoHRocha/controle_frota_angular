import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Fuel, Vehicle, Maintenance } from '@shared/index';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private BASE_URL: string = 'http://localhost:3001/'

  constructor(private http : HttpClient) { }

  filtroVeiculo(id: number, list: any): any{
    return list.idVehicle = id
  }

//VEÍCULO
  getVehicles(): Observable<Vehicle[]>{
    return this.http.get<Vehicle[]>(this.BASE_URL+'vehicle')
  }

  insertVehicle(vehicle : Vehicle): Observable<Vehicle> {
    let vehicles
    this.getVehicles().subscribe(
      response => {
        vehicle.id = response[response.length-1].id+1
    })
    return this.http.post<Vehicle>(this.BASE_URL+'vehicle',vehicle)
  }

  deleteVehicle(vehicle: Vehicle): Observable<any>{
    return this.http.delete<Vehicle>(this.BASE_URL+'vehicle/'+vehicle.id)
  }

//ABASTECIMENTO
  toFuel(vehicle: Vehicle, fuel: Fuel): Observable<any>{
    fuel.idVehicle = vehicle.id    
    return this.http.post<Fuel>(this.BASE_URL+'fuel',fuel)
  }

  listFuel(vehicle: Vehicle): Observable<Fuel[]>{
    let fuels
    this.http.get<Fuel[]>(this.BASE_URL+'fuel').subscribe(
      data => {
        return fuels.filter(this.filtroVeiculo(vehicle.id,data))
      }
    )
    return fuels
  }

//MANUTENÇÃO
  doMaintenance(vehicle: Vehicle, maintenance: Maintenance): Observable<any>{
    return this.http.post<Maintenance>(this.BASE_URL+'maintenance',maintenance)
  }
}
