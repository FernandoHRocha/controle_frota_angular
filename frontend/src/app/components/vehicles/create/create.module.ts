import { NgModule } from "@angular/core";
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule, ReactiveFormsModule  } from "@angular/forms";
import { RadioModule } from "@shared/forms";

import { CreateComponent } from "@components/create/create.component";

@NgModule({
    declarations:[
        CreateComponent
    ],
    imports:[
        MatCardModule,
        RadioModule,
        FormsModule,
        ReactiveFormsModule,
        MatDividerModule,
        MatFormFieldModule
    ],
    exports:[

    ]
})
export class CreateModule {

}