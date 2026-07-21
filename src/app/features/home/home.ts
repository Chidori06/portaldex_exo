import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CharactersService } from '../characters/services/characters';
import { ApiResponse, InfoResponse } from '../../shared/types/api-response.types';
import { PlanetesService } from '../planetes/services/planetes';
import { EpisodesService } from '../episodes/services/episodes';


@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private readonly characterService = inject(CharactersService);
  readonly characters = this.characterService.characterSignal;
  private readonly planeteService = inject(PlanetesService);
  readonly planetes = this.planeteService.planetesSignal;
  private readonly episodeService = inject(EpisodesService);
  readonly episodes = this.episodeService.episodesSignal;
  readonly infos = signal<InfoResponse>({} as InfoResponse);
  currentChara = signal(0);
  currentLoca = signal(0);
  currentEpi = signal(0);

  ngOnInit(): void {
    this.loadChara();
    this.loadLoca();
    this.loadEpi();
  }

  loadChara(count?: number) {
    this.characterService
      .getCount()
      .subscribe((response: ApiResponse<InfoResponse[]>) => {
        this.infos.set(response.info);
        this.currentChara.set(this.infos().count);
      });
  }

  loadLoca(count?: number) {
    this.planeteService
      .getCount()
      .subscribe((response: ApiResponse<InfoResponse[]>) => {
        this.infos.set(response.info);
        this.currentLoca.set(this.infos().count);
      });
  }

  loadEpi(count?: number) {
    this.episodeService
      .getCount()
      .subscribe((response: ApiResponse<InfoResponse[]>) => {
        this.infos.set(response.info);
        this.currentEpi.set(this.infos().count);
      });
  }


}
