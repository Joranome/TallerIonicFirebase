import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from '../interfaces/pokemon';
import { PokemonService } from '../services/pokemon.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  all: Pokemon[] = [];

  constructor(public pkmnService: PokemonService, public router:Router) {
    pkmnService.getAllSnapshot().subscribe(r => {
      this.all = r;
    });
  }

  edit(poke:Pokemon){
    this.router.navigate(['/detail/', { pokemon: JSON.stringify(poke) }]);
  }

}
