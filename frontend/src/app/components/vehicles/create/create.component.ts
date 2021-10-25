import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../vehicle.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Vehicle } from '../vehicle.model'
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  
  vehicle: Vehicle = {
    frota: 4,
    placa:"ahh4578",
    odometro: 0
  }

  constructor(private vehicleService : VehicleService,
    private snackBar : MatSnackBar,
    private router: Router) { }
    
    ngOnInit(): void {
    }
      

  getVehicle(): void {
    let msg = 'Veículo inserido com sucesso.'
    this.vehicleService.insertVehicle(this.vehicle).subscribe(()=>{
      this.snackBar.open(msg,'x',{
        duration:2000,
        horizontalPosition:"center",
        verticalPosition:"bottom"
      })
    })
  }

  cancel(): void {
    this.router.navigate(["/frota"])
  }

}
