import { ModuleWithProviders, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { CreateComponent } from "@components/create/create.component";
import { RadioModule } from "@shared/forms";
import { LeaveCreateGuard } from "./leave-create.guard";

const ROUTER: Routes = [
    {
        path:'',
        component: CreateComponent,
        canDeactivate: [LeaveCreateGuard]
    }
]

@NgModule({
    declarations:[
        CreateComponent,
    ],
    imports:[
        CommonModule,
        MatInputModule,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
        MatDividerModule,
        MatFormFieldModule,
        RadioModule,
        MatCardModule,
        RouterModule.forChild(ROUTER),
    ],
    exports:[
        CreateComponent
    ],
    providers: [
        LeaveCreateGuard
    ]
})
export class CreateModule {
    static forRoot(): ModuleWithProviders<CreateModule> {
        return {
            ngModule: CreateModule,
            providers: [
                { provide: LeaveCreateGuard }
            ]
        };
    }
}