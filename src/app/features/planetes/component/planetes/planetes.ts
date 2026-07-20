import { Component, inject, signal } from '@angular/core';
import { PlaneteCard } from '../planete-card/planete-card';
import { Pagination } from '../../../characters/components/pagination/pagination';
import { PlanetesService } from '../../services/planetes';
import { ApiResponse, InfoResponse } from '../../../../shared/types/api-response.types';
import { Planete } from '../../types/planete.type';

@Component({
  selector: 'app-planetes',
  imports: [PlaneteCard, Pagination],
  templateUrl: './planetes.html',
  styleUrl: './planetes.css',
})
export class Planetes {
  private readonly planeteService = inject(PlanetesService);
  readonly planetes = this.planeteService.planetesSignal;
  readonly infos = signal<InfoResponse>({} as InfoResponse);
  currentPage = signal(1);
  totalPage = signal(0);

  ngOnInit() {
    // Method 1 : Do everything in the service
    this.planeteService.getPlanetesFromService().subscribe();
    // Method 2 : Get needed value in the component directly
    this.loadCharacters();
  }

  loadCharacters(page?: number) {
    this.currentPage.set(page ? page : 1);

    this.planeteService
      .getPlanetesFromService()
      .subscribe((response: ApiResponse<Planete[]>) => {
        this.infos.set(response.info);
        this.totalPage.set(this.infos().pages);
      });
  }

  changePage(page: number) {
    this.currentPage.set(page);
    this.planeteService.getPlanetesFromService(page).subscribe();
  }
}
