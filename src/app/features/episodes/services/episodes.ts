import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Episode } from '../types/episode.type';
import { Observable, tap } from 'rxjs';
import { ApiResponse, InfoResponse } from '../../../shared/types/api-response.types';

@Injectable({
  providedIn: 'root',
})
export class EpisodesService {
  private readonly http = inject(HttpClient);
  private episodes = signal<Episode[]>([]);
  readonly episodesSignal = this.episodes.asReadonly();
  readonly url = 'https://rickandmortyapi.com/api/episode/';

  //Chercher tous les épisodes
  getEpisodesFromService(page: number = 1): Observable<ApiResponse<Episode[]>> {
    return this.http.get<ApiResponse<Episode[]>>(this.url, {
      params: { page: page },
    })
      .pipe(tap((response: ApiResponse<Episode[]>) => this.episodes.set(response.results)));
  }

  //Chercher le "count" des épisodes
  getCount(count: number = 1): Observable<ApiResponse<InfoResponse[]>> {
    return this.http.get<ApiResponse<InfoResponse[]>>(this.url, {
      params: { count: count },
    });

  }
}
