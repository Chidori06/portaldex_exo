import { Component, inject, OnInit, signal } from '@angular/core';
import { EpisodeCard } from '../episode-card/episode-card';
import { Pagination } from '../../../characters/components/pagination/pagination';
import { EpisodesService } from '../../services/episodes';
import { ApiResponse, InfoResponse } from '../../../../shared/types/api-response.types';
import { Episode } from '../../types/episode.type';

@Component({
  selector: 'app-episodes',
  imports: [EpisodeCard, Pagination],
  templateUrl: './episodes.html',
  styleUrl: './episodes.css',
})
export class Episodes implements OnInit {
  private readonly episodeService = inject(EpisodesService);
  readonly episodes = this.episodeService.episodesSignal;
  readonly infos = signal<InfoResponse>({} as InfoResponse);
  currentPage = signal(1);
  totalPage = signal(0);

  ngOnInit() {
    // Method 1 : Do everything in the service
    this.episodeService.getEpisodesFromService().subscribe();
    // Method 2 : Get needed value in the component directly
    this.loadCharacters();
  }

  loadCharacters(page?: number) {
    this.currentPage.set(page ? page : 1);

    this.episodeService
      .getEpisodesFromService()
      .subscribe((response: ApiResponse<Episode[]>) => {
        this.infos.set(response.info);
        this.totalPage.set(this.infos().pages);
      });
  }

  changePage(page: number) {
    this.currentPage.set(page);
    this.episodeService.getEpisodesFromService(page).subscribe();
  }

}
