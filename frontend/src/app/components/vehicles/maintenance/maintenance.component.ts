import { Component, OnInit, Input } from '@angular/core';

import { Vehicle } from '@shared/vehicle.model';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.css']
})
export class MaintenanceComponent implements OnInit {

  @Input() vehicle: Vehicle;

  constructor() { }

  ngOnInit(): void {
  }

}
