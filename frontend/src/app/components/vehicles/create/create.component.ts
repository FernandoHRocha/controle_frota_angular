import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { Vehicle } from '@shared/index';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  @Output() inserirVeiculo = new EventEmitter<Vehicle>()
  vehicles: Vehicle[];
  vehicle: Vehicle = {};

  constructor(private router: Router) {}
    
  ngOnInit(): void {
  }
      
  inserirFrota(): void {
    this.inserirVeiculo.emit(this.vehicle)
  }

  cancel(): void {
    this.router.navigate(["/frota"])
  }

}
