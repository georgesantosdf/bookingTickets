export class Movie {
    id: number;
    popularity: number;
    vote_count: number;
    video: boolean;
    poster_path: string;
    adult: boolean;
    backdrop_path: string;
    original_language: string;
    original_title: string;
    genre_ids:[];
    title: string;
    vote_average: number;
    overview: string;
    release_date:string;

    Movie(id:number, popularity:number, vote_count:number,
         video:boolean, poster_path:string, 
         adult:boolean, backdrop_path:string, original_language:string, 
         original_title:string, genre_ids:[], title:string, vote_average:number, overview:string, release_date:string){
    this.id = id;
    this.popularity = popularity;
    this.vote_count = vote_count;
    this.video = video;
    this.poster_path = poster_path;
    this.adult = adult;
    this.backdrop_path = backdrop_path;
    this.original_language = original_language;
    this.original_title = original_title;
    this.genre_ids = genre_ids;
    this.title = title;
    this.vote_average = vote_average;
    this.overview = overview;
    this.release_date = release_date;
    }
}