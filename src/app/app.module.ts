import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateReservationComponent } from './create-reservation/create-reservation.component';
import { AddressFormComponent } from './shared/address-form/address-form.component';

import { CreateReservationService } from './create-reservation/create-reservation.service';
import { AddressFormService } from './shared/address-form/address-form.service';
import { ErrorFormComponent } from './shared/erro-form/error-form.component';
import { CampoErroFormComponent } from './shared/campo-erro-form/campo-erro-form.component';



@NgModule({
  declarations: [
    AppComponent,
    CreateReservationComponent,
    AddressFormComponent,
    ErrorFormComponent,
    CampoErroFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  exports: [
    ErrorFormComponent
  ],
  providers: [CreateReservationService ,
              AddressFormService],
  bootstrap: [AppComponent]
})
export class AppModule { }
