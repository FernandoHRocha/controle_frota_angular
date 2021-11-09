import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { RadioOption } from './radio.model'

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.css']
})
export class RadioComponent implements OnInit {

  @Input() options: RadioOption[];
  @Input() formulario: FormGroup;
  @Input() chave: string;

  value: any;
  choose: string;
  control: FormControl = new FormControl('',Validators.required)

  constructor() { }

  ngOnInit(): void {
    this.formulario.addControl(this.chave, this.control)
  }

}
