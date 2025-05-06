import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NasaService {
  private apiUrl = 'https://api.nasa.gov/planetary/apod';
  private apiKey = 'wjnOA54mLg61USuxDlwOjs8jcTviuuEjxqAUUNY5';

  constructor(private http: HttpClient) { }

  getAstronomyPicture(): Observable<any> {
    return this.http.get(`${this.apiUrl}?api_key=${this.apiKey}`);
  }

  getAstronomyPicturesByDate(start_date: string, end_date: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?api_key=${this.apiKey}&start_date=${start_date}&end_date=${end_date}`);
  }
}