import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vehicle } from './vehicle.model'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http : HttpClient) { }

  insertVehicle(vehicle : Vehicle): Observable<Vehicle> {
    return this.http.post<Vehicle>('http://localhost:3001/vehicle',vehicle)
  }
  getVehicles(): Observable<Vehicle>{
    return this.http.get<Vehicle>('http://localhost:3001/vehicle')
  }
  printConsole(msg: string):void {
    console.log(msg)
  }
}
