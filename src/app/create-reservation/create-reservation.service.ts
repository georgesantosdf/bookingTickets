import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Reservation} from '../entities/reservation';
import { environment } from '../../environments/environment';
import { Movie } from '../entities/movie';

@Injectable({
  providedIn: 'root'
})
export class CreateReservationService {
  private readonly API = `${environment.API}`;
  private readonly API_MOVIE_DB = `${environment.API_MOVIE_DB}`;

  constructor(private http: HttpClient) { }

  createReservation(reservation:Reservation) {
   return this.http.post(this.API, reservation);
 }

  getMovieDB(language:string, page:string){
    let options: HttpParams = new HttpParams();
    options = options.set("api_key", "123499d790e577da59a10ae44cf534d5");
    options = options.set("language", language);
    options = options.set("page", page);

    return this.http.get<Movie[]>(this.API_MOVIE_DB, { params: options, observe: 'response' });
  
  }
}
