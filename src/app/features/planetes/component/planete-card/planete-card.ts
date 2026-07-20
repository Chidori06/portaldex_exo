import { Component, input } from '@angular/core';
import { Planete } from '../../types/planete.type';

@Component({
  selector: 'app-planete-card',
  imports: [],
  templateUrl: './planete-card.html',
  styleUrl: './planete-card.css',
})
export class PlaneteCard {
  planete = input.required<Planete>();
}
