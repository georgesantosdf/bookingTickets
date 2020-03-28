import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Reservation} from '../util/reservation';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreateReservationService {
  private readonly API = `${environment.API}`;
  private readonly API_MOVIE_DB = `${environment.API_MOVIE_DB}`;

  constructor(private http: HttpClient) { }

  private create(reservation) {
   return this.http.post(this.API, reservation);
 }

  private getMovieDB(){
    return this.http.get(this.API_MOVIE_DB);
  }
}
