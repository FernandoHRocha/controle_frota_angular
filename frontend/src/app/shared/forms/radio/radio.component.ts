import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { RadioOption } from './radio.model'

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.css']
})
export class RadioComponent implements OnInit {

  @Input() options: RadioOption[];
  @Input() formulario: FormGroup;
  @Input() control: FormControl;
  @Input() chave: string;

  constructor() {}
  
  ngOnInit(): void {
    this.formulario.addControl(this.chave, this.control)
  }

}
