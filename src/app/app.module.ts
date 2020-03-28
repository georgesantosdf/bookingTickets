import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateReservationComponent } from './create-reservation/create-reservation.component';
import { AddressFormComponent } from './shared/address-form/address-form.component';

import { CreateReservationService } from './create-reservation/create-reservation.service';
import { AddressFormService } from './shared/address-form/address-form.service';

@NgModule({
  declarations: [
    AppComponent,
    CreateReservationComponent,
    AddressFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [CreateReservationService,
              AddressFormService],
  bootstrap: [AppComponent]
})
export class AppModule { }
