import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { Vehicle } from '@shared/index';
import { SnackbarService } from '@shared/snackbar.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  @Output() inserirVeiculo: EventEmitter<Vehicle>;
  vehicles: Vehicle[];
  vehicle: Vehicle = {};

  constructor(private snackBar : SnackbarService,
    private router: Router) {}
    
  ngOnInit(): void {
  }
      
  inserirFrota(): void {
    this.inserirVeiculo.emit(this.vehicle)
  }

  cancel(): void {
    this.router.navigate(["/frota"])
  }

}
