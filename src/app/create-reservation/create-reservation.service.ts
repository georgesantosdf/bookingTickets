import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Reservation} from '../util/reservation';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreateReservationService {
  private readonly API = `${environment.API}`;

  constructor(private http: HttpClient) { }

  private create(reservation) {
   return this.http.post(this.API, reservation);
 }
}
