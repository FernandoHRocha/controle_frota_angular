import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Fuel, Vehicle, Maintenance } from '@shared/index';
import { Observable } from 'rxjs';
import { FROTA_API } from 'src/app/app.api';
import { LoginService } from 'src/app/security/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private BASE_URL: string = FROTA_API+'/'

  constructor(
    private http : HttpClient,
    private loginService: LoginService) { }

  filtroVeiculo(id: number, list: any): any{
    return list.idVehicle = id
  }

//VEÍCULO
  getVehicles(): Observable<Vehicle[]>{
    
    return this.http.get<Vehicle[]>(this.BASE_URL+'vehicle' )
  }

  getVehicle(id: number): Observable<Vehicle>{
    return this.http.get<Vehicle>(this.BASE_URL+'vehicle/'+id)
  }

  getFrota(tipo: string,term: string): Observable<Vehicle[]>{
    return this.http.get<Vehicle[]>(
      this.BASE_URL+'vehicle', {
        params: {
          tipo: tipo,
          q: term
        }
      }
    )
  }

  insertVehicle(vehicle : Vehicle): Observable<Vehicle> {
    let vehicles: Vehicle;
    this.getVehicles().subscribe(
      response => {
        vehicle.id = response[response.length-1].id+1
    })
    return this.http.post<Vehicle>(this.BASE_URL+'vehicle',vehicle)
  }

  deleteVehicle(vehicle: Vehicle): Observable<any>{
    //deletar todas referências do veículo em outras tabelas
    return this.http.delete<Vehicle>(this.BASE_URL+'vehicle/'+vehicle.id)
  }

  updateVehicle(vehicle: Vehicle): Observable<any>{
    return this.http.put<Vehicle>(this.BASE_URL+'vehicle/'+vehicle.id,vehicle)
  }

//ABASTECIMENTO
  getFuel(id: number): Observable<Fuel>{
    return this.http.get<Fuel>(this.BASE_URL+'fuel')
  }  


  toFuel(fuel: Fuel): Observable<any>{
    let vehicle: Vehicle;
    this.getVehicle(fuel.idVehicle).subscribe(
      data => {
        vehicle = data
        vehicle.hodometro = fuel.hodometro
        this.updateVehicle(vehicle).subscribe()
      }
    )
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
  doMaintenance(maintenance: Maintenance): Observable<any>{
    let vehicle: Vehicle;
    this.getVehicle(maintenance.idVehicle).subscribe(
      data => {
        vehicle = data
        vehicle.hodometro = maintenance.hodometro
        this.updateVehicle(vehicle).subscribe()
      }
    )
    return this.http.post<Maintenance>(this.BASE_URL+'maintenance/',maintenance)
  }



}
