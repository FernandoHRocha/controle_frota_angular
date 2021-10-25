import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {
  
  constructor(private router: Router) { }
  
  ngOnInit(): void {
  }
  
    adicionarVeiculo(): void {
      this.router.navigate(['/vehicle/create'])
    }
  
    vehicles = [
      {frota:1,placa:'abc1234'},
      {frota:2,placa:'abc7834'},
      {frota:3,placa:'adf1234'}
    ];

}
