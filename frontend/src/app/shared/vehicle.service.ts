import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vehicle } from '@shared/index';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private BASE_URL: string = 'http://localhost:3001/'

  constructor(private http : HttpClient) { }

  getVehicles(): Observable<Vehicle[]>{
    return this.http.get<Vehicle[]>(this.BASE_URL+'vehicle')
  }

  insertVehicle(vehicle : Vehicle): Observable<Vehicle> {
    let vehicles
    this.getVehicles().subscribe(
      response => {
        vehicle.id = response.length
    })
    return this.http.post<Vehicle>(this.BASE_URL+'vehicle',vehicle)
  }

  deleteVehicle(vehicle: Vehicle): void{
    this.http.delete<Vehicle>(this.BASE_URL+'vehicle/'+vehicle.id) 
  }
}
