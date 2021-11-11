import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { animate, trigger, state, style, transition, query } from '@angular/animations';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  animations: [
    trigger('navState', [
      state('close',style({
        width:'60px'
      })),
      state('open',style({
        width:'150px',
        color:'white'
      })),
      transition('* => *', animate('0.2s 0s ease-in'))
    ])
  ]
})
export class NavComponent implements OnInit {
  
  navPanelState: string = 'close';

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

}
