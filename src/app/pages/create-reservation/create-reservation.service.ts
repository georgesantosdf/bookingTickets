import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import {Reservation} from '../../core/entities/reservation';
import { environment } from '../../../environments/environment';
import { Movie } from '../../core/entities/movie';
import { ApiMoviedb } from 'src/app/moviedb-config-sample';

@Injectable({
  providedIn: 'root'
})
export class CreateReservationService extends ApiMoviedb {
  private readonly API = `${environment.API}`;

  constructor(private http: HttpClient) { super() }

  createReservation(reservation:Reservation) {
   return this.http.post(this.API, reservation);
 }

  getMovieDB(language:string, page:string){
    let options: HttpParams = new HttpParams();
    options = options.set("api_key", this.keyUrlMovie);
    options = options.set("language", language);
    options = options.set("page", page);

    return this.http.get<Movie[]>(`${this.baseUrlMovie}movie/upcoming`, { params: options});
  }
}
