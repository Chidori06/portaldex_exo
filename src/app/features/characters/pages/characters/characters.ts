import { Component, OnInit, signal, inject } from '@angular/core';
import { Character } from '../../types/character.type';
import { CharacterCard } from '../../components/character-card/character-card';
import { CharactersService } from '../../services/characters';
import { ApiResponse, InfoResponse } from '../../../../shared/types/api-response.types';
import { Pagination } from '../../components/pagination/pagination';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-characters',
  imports: [CharacterCard, Pagination, ReactiveFormsModule],
  templateUrl: './characters.html',
  styleUrl: './characters.css',
})
export class Characters implements OnInit {
  private readonly characterService = inject(CharactersService);
  readonly characters = this.characterService.characterSignal;
  readonly infos = signal<InfoResponse>({} as InfoResponse);
  currentPage = signal(1);
  totalPage = signal(0);
  //Ancien appel
  // searchControl = new FormControl('', { nonNullable: true });
  filters = new FormGroup({
    name: new FormControl('', { nonNullable: true }),
    status: new FormControl('', { nonNullable: true }),
    species: new FormControl('', { nonNullable: true }),
    gender: new FormControl('', { nonNullable: true }),
  });

  ngOnInit() {
    // Method 1 : Do everything in the service
    this.characterService.getCharactersFromService().subscribe();
    // Method 2 : Get needed value in the component directly
    this.loadCharacters();

    //Ancien appel pour chercher par nom
    // this.searchControl.valueChanges
    //   .pipe(
    //     debounceTime(300),
    //     distinctUntilChanged()
    //   )
    //   .subscribe(name => {
    //     this.characterService
    //       .searchCharaByName(1, name)
    //       .subscribe(response => {
    //         this.infos.set(response.info);
    //         this.totalPage.set(response.info.pages);
    //       });
    //   });

    //Nouveau groupe pour recherche
    this.characterService
      .searchCharactersByFilters(1, {})
      .subscribe();
    //Changer la valeur des filtres
    this.filters.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(filters => {

        this.characterService
          .searchCharactersByFilters(1, {
            name: filters.name,
            status: filters.status,
            species: filters.species,
            gender: filters.gender
          })
          .subscribe();
      });
  }

  loadCharacters(page?: number) {
    this.currentPage.set(page ? page : 1);

    this.characterService
      .getCharacterFromComponent()
      .subscribe((response: ApiResponse<Character[]>) => {
        this.infos.set(response.info);
        this.totalPage.set(this.infos().pages);
      });
  }

  changePage(page: number) {
    this.currentPage.set(page);
    this.characterService.getCharactersFromService(page).subscribe();
  }

  //Ancienne méthode de recherche par nom
  // searchCharacters(page = 1) {
  //   this.currentPage.set(page);

  //   this.characterService
  //     .searchCharaByName(page, this.search)
  //     .subscribe(response => {
  //       this.infos.set(response.info);
  //       this.totalPage.set(response.info.pages);
  //     });
  // }

}
