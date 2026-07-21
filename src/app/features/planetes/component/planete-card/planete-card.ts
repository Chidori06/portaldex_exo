import { Component, inject, input, OnInit, signal } from '@angular/core';
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
export class PlaneteCard implements OnInit {
  planete = input.required<Planete>();
  private readonly planeteService = inject(PlanetesService);
  readonly planetes = this.planeteService.planetesSignal;
  readonly infos = signal<InfoResponse>({} as InfoResponse);

  //Signal pour le tableau des résidents
  residents = signal<Character[]>([]);

  //Pour bouton affichage résidents
  showResidents = false;


  ngOnInit() {
    //Permet d'aller utiliser la méthode et d'y souscrire
    this.planeteService
      .getResidents(this.planete())
      .subscribe(residents => {
        this.residents.set(residents);
      });
  }
}

