import { Component, inject, input, signal } from '@angular/core';
import { Planete } from '../../types/planete.type';
import { PlanetesService } from '../../services/planetes';
import { InfoResponse } from '../../../../shared/types/api-response.types';
import { Character } from '../../../characters/types/character.type';

@Component({
  selector: 'app-planete-card',
  imports: [],
  templateUrl: './planete-card.html',
  styleUrl: './planete-card.css',
})
export class PlaneteCard {
  planete = input.required<Planete>();
  private readonly planeteService = inject(PlanetesService);
  readonly planetes = this.planeteService.planetesSignal;
  readonly infos = signal<InfoResponse>({} as InfoResponse);


  residents = signal<Character[]>([]);


  ngOnInit() {
    this.planeteService
      .getResidents(this.planete())
      .subscribe(residents => {
        this.residents.set(residents);
      });
  }
}

