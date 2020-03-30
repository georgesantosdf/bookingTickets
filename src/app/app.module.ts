import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { NgxMaskModule } from 'ngx-mask';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateReservationComponent } from './pages/create-reservation/create-reservation.component';
import { AddressFormComponent } from './shared/components/forms/address-form/address-form.component';

import { CreateReservationService } from './pages/create-reservation/create-reservation.service';
import { AddressFormService } from './shared/components/forms/address-form/address-form.service';
import { CampoErroFormComponent } from './shared/validators/campo-erro-form/campo-erro-form.component';
import { HttpsRequestInterceptor } from './core/interceptors/httpsRequestInterceptor';
import { ErrorFormComponent } from './shared/validators/erro-form/error-form.component';
import { LoadingComponent } from './shared/components/loading/loading.component';



@NgModule({
  declarations: [
    AppComponent,
    CreateReservationComponent,
    AddressFormComponent,
    ErrorFormComponent,
    CampoErroFormComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,
    FlexLayoutModule
  ],
  exports: [
    ErrorFormComponent
  ],
  providers: [AddressFormService,
              CreateReservationService,
              {
                provide: HTTP_INTERCEPTORS,
                useClass: HttpsRequestInterceptor,
                multi: true,
              } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
