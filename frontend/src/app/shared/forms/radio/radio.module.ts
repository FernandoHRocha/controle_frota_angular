import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { RadioComponent } from "@shared/forms/radio/radio.component";

@NgModule({
    declarations:[
        RadioComponent
    ],
    imports:[
        FormsModule,
        CommonModule,
        MatRadioModule,
        ReactiveFormsModule
    ],
    exports:[
        MatRadioModule,
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        RadioComponent
    ]
})
export class RadioModule {

}