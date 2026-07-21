import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Planete } from '../types/planete.type';
import { Observable, tap } from 'rxjs';
import { ApiResponse } from '../../../shared/types/api-response.types';

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

}

