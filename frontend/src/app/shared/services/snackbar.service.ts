import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  popupBottom(msg:string,duration:number = 2000):void{
    this.snackBar.open(msg,'x',{
      duration:duration,
      horizontalPosition:"center",
      verticalPosition:"bottom"
    })
  }

}
