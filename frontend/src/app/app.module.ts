import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, PreloadAllModules, Router } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion'
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

import { DatePipe, LocationStrategy, HashLocationStrategy } from '@angular/common'
import { MatChipsModule } from '@angular/material/chips';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { routes } from './app-routing.module';
import { HeaderComponent } from './components/template/header/header.component';
import { FooterComponent } from './components/template/footer/footer.component';
import { NavComponent } from './components/template/nav/nav.component';
import { HomeComponent, CrudComponent } from './views/index';
import { ListComponent, MaintenanceComponent, FuelComponent, FuelMainDeleteComponent } from '@components/index';
import { RadioModule, DecimalPipe, CustomValidators } from '@shared/index';
import { VehicleSnackbarComponent } from './shared/vehicle-snackbar/vehicle-snackbar.component';
import { VehicleSnackbarService } from '@shared/services/vehicleSnackbar.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './security/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    HomeComponent,
    CrudComponent,
    ListComponent,
    MaintenanceComponent,
    FuelComponent,
    FuelMainDeleteComponent,
    DecimalPipe,
    VehicleSnackbarComponent,
    NotFoundComponent,
    LoginComponent,
  ],
  imports: [
    RadioModule,
    MatChipsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatIconModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatExpansionModule,
    MatSidenavModule,
    MatCardModule,
    HttpClientModule,
    MatButtonModule,
    MatSnackBarModule,
    MatInputModule,
    MatFormFieldModule,
    MatListModule,
    BrowserModule,
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy },
    VehicleSnackbarService,
    CustomValidators,
    DatePipe,
    DecimalPipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
