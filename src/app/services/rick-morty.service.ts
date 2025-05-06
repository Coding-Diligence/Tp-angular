import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RickMortyService {
  private apiUrl = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) { }

  getAllCharacters(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      switchMap(firstPage => {
        const totalPages = firstPage.info.pages;
        const requests = [];
        for (let i = 2; i <= totalPages; i++) {
          requests.push(this.http.get<any>(`${this.apiUrl}?page=${i}`));
        }
        
        return forkJoin(requests).pipe(
          map(responses => {
            let allCharacters = [...firstPage.results];
            responses.forEach(response => {
              allCharacters = [...allCharacters, ...response.results];
            });
            return allCharacters;
          })
        );
      })
    );
  }

  getCharacterVersions(name: string): Observable<any[]> {
    return this.getAllCharacters().pipe(
      map(characters => characters.filter(c => c.name.includes(name)))
    );
  }
}