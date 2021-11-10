import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.css']
})
export class RadioComponent implements OnInit {

  @Input() options;
  @Input() formulario: FormGroup;
  @Input() control: FormControl;
  @Input() chave: string;

  constructor() {}
  
  ngOnInit(): void {
    this.formulario.addControl(this.chave, this.control)
  }

}
