import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import {Reservation} from '../entities/reservation';
import { environment } from '../../environments/environment';
import { Result } from '../entities/result';
import { Observable } from 'rxjs';
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

  async getMovieDB(language:string, page:string){
    let options: HttpParams = new HttpParams();
    options = options.set("api_key", environment.AUTH_MOVIE_DB);
    options = options.set("language", language);
    options = options.set("page", page);

    return await this.http.get<Movie>(this.API_MOVIE_DB, { params: options}).toPromise();
  
  }
}
