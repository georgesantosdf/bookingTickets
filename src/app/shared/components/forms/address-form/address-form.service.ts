import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddressFormService {

  private readonly API_CEP = `${environment.API_CEP_SECUNDARIO}`;

   constructor(private http: HttpClient) { }


  consultaCEP(cep) {
    cep = cep.replace(/\D/g, '');

    if (cep != '') {
      var validacep = /^[0-9]{8}$/;

      if (validacep.test(cep)) {
        return this.http
          .get(`${this.API_CEP}/${cep}/json`);
      }
    }
  }
}
