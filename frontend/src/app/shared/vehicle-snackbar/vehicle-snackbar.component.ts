import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations'
import { VehicleSnackbarService } from '@shared/services/vehicleSnackbar.service';
import { timer } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';



@Component({
  selector: 'app-vehicle-snackbar',
  templateUrl: './vehicle-snackbar.component.html',
  styleUrls: ['./vehicle-snackbar.component.css'],
  animations: [
    trigger('snack-visibility', [
      state('left', style({
        left: '50%',
      })),
      state('right',style({
        left: 'calc(100% + 175px)',
      })),
      transition('right => left',animate('1000ms 0s ease-out')),
      transition('left => right',animate('1000ms 0s ease-in')),
    ])
  ]
})
export class VehicleSnackbarComponent implements OnInit {

  message: string = 'Hello world';
  snackVisibility: string = 'right';

  constructor(private vehicleSnackbarService: VehicleSnackbarService) { }

  ngOnInit(): void {
    this.vehicleSnackbarService.notifier.pipe(
      tap(
        message => {
          this.message = message;
          this.snackVisibility = 'left';
          document.getElementById("snackimg").style.transform = "scaleX(1)"
          console.log(message)
        }), switchMap(message => timer(4000))
    ).subscribe(
      timer => {
        this.snackVisibility = 'right'
          document.getElementById("snackimg").style.transform = "scaleX(-1)"
          console.log('timer')
      }
    )
  }
}
