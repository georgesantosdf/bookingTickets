import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Address } from 'src/app/util/address';

@Injectable({
  providedIn: 'root'
})
export class AddressFormService {

  private readonly API = `${environment.API_CEP}cep`;

   constructor(private http: HttpClient) { }

  getUser(id){
    return this.http.get(`${this.API}/${id}`);
  }

}
