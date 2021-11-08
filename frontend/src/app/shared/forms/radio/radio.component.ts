import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RadioOption } from './radio.model'

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.css']
})
export class RadioComponent implements OnInit {

  @Input() options: RadioOption[];
  @Output() chooseOption = new EventEmitter<string>();
  value: any;
  choose: string;

  constructor() { }

  ngOnInit(): void {
  }
  
  changeOption(choose: string){
    this.chooseOption.emit(choose)
  }

}
