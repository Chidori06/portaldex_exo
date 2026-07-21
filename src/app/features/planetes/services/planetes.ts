import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Planete } from '../types/planete.type';
import { Observable, tap } from 'rxjs';
import { ApiResponse, InfoResponse } from '../../../shared/types/api-response.types';
import { Character } from '../../characters/types/character.type';

@Injectable({
  providedIn: 'root',
})
export class PlanetesService {
  private readonly http = inject(HttpClient);
  private planetes = signal<Planete[]>([]);
  readonly planetesSignal = this.planetes.asReadonly();
  readonly url = 'https://rickandmortyapi.com/api/location/';

  getPlanetesFromService(page: number = 1): Observable<ApiResponse<Planete[]>> {
    return this.http.get<ApiResponse<Planete[]>>(this.url, {
      params: { page: page },
    })
      .pipe(tap((response: ApiResponse<Planete[]>) => this.planetes.set(response.results)));
  }

  getCount(count: number = 1): Observable<ApiResponse<InfoResponse[]>> {
    return this.http.get<ApiResponse<InfoResponse[]>>(this.url, {
      params: { count: count },
    });

  }

  //Avoir la vraie liste des résidents
  getResidents(planete: Planete): Observable<Character[]> {

    //On sépare les ids des urls
    const ids = planete.residents
      .map(residentsUrl => residentsUrl.split('/').pop())
      .filter(id => id)
      .join(',');

    // Si la planète n'a aucun résident, on renvoie un observable vide
    if (!ids) {
      return new Observable(observer => {
        observer.next([]);
        observer.complete();
      });
    }

    return this.http.get<Character[]>(`https://rickandmortyapi.com/api/character/${ids}`);
  }
}


