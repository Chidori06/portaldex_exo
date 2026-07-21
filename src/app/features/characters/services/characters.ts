import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { Character } from '../types/character.type';
import { ApiResponse, InfoResponse } from '../../../shared/types/api-response.types';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  private readonly http = inject(HttpClient);
  private characters = signal<Character[]>([]);
  readonly characterSignal = this.characters.asReadonly();
  readonly url = 'https://rickandmortyapi.com/api/character/';

  getCharactersFromService(page: number = 1): Observable<ApiResponse<Character[]>> {
    return this.http
      .get<ApiResponse<Character[]>>(this.url, {
        params: { page: page },
      })
      .pipe(tap((response: ApiResponse<Character[]>) => this.characters.set(response.results)));
  }

  getCharacterFromComponent(page: number = 1): Observable<ApiResponse<Character[]>> {
    return this.http.get<ApiResponse<Character[]>>(this.url, {
      params: { page: page },
    });
  }

  getCount(count: number = 1): Observable<ApiResponse<InfoResponse[]>> {
    return this.http.get<ApiResponse<InfoResponse[]>>(this.url, {
      params: { count: count },
    });
  }

  //Ancienne méthode pour recherche par nom
  // searchCharaByName(page: number, name: string = ""): Observable<ApiResponse<Character[]>> {
  //   let params = new HttpParams().set('page', page);

  //   if (name.trim()) {
  //     params = params.set('name', name);
  //   }

  //   return this.http
  //     .get<ApiResponse<Character[]>>(this.url, { params })
  //     .pipe(
  //       tap(response => this.characters.set(response.results))
  //     );
  // }

  //Filtrer tous ce qu'on veut comme paramètres
  searchCharactersByFilters(
    page = 1,
    filters: {
      name?: string;
      status?: string;
      species?: string;
      gender?: string;
    }
  ): Observable<ApiResponse<Character[]>> {

    let params = new HttpParams()
      .set('page', page);

    //permet de ne pas écrire plusieurs if
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params = params.set(key, value);
      }
    });

    return this.http
      .get<ApiResponse<Character[]>>(this.url, { params })
      .pipe(
        tap(response => this.characters.set(response.results))
      );
  }

}

