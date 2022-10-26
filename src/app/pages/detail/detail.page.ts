import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController, NavParams } from '@ionic/angular';
import { Pokemon } from 'src/app/interfaces/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  isNew = false;
  pokemon: Pokemon;
  pokemonForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    type1: new FormControl('', [Validators.required]),
    type2: new FormControl('', [Validators.required]),
    level: new FormControl(1, [Validators.required]),
    shiny: new FormControl(false, [Validators.required]),
  });

  constructor(public pokemonService: PokemonService, private navController: NavController, public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let obj = params['pokemon'];
      if (obj) {
        this.pokemon = JSON.parse(obj)
        this.isNew = !this.pokemon;
        this.pokemonForm.setValue({
          name: this.pokemon.name,
          type1: this.pokemon.type1,
          type2: this.pokemon.type2,
          level: this.pokemon.level,
          shiny: this.pokemon.shiny
        });
      }else
        this.isNew=true;
    });
  }

  back() {
    this.navController.back();
  }

  add() {
    let pokemon: Pokemon = {
      id: '',
      name: this.pokemonForm.value['name'],
      type1: this.pokemonForm.value['type1'],
      type2: this.pokemonForm.value['type2'],
      nickname: '',
      level: this.pokemonForm.value['level'],
      shiny: this.pokemonForm.value['shiny']
    };
    this.pokemonService.add(pokemon).then(r => {
      alert("El pokemon " + pokemon.name + " se ha registrado");
      this.pokemonForm.reset();
    }).catch(e => {
      alert("Error: " + e);
    })
  }

  update() {
    this.pokemon.name = this.pokemonForm.value['name'];
    this.pokemon.type1 = this.pokemonForm.value['type1'];
    this.pokemon.type2 = this.pokemonForm.value['type2'];
    this.pokemon.level = this.pokemonForm.value['level'];
    this.pokemon.shiny = this.pokemonForm.value['shiny'];
    this.pokemonService.update(this.pokemon).then(r => {
      alert("El pokemon " + this.pokemon.name + " se ha actualizado");
      this.pokemonForm.reset();
    }).catch(e => {
      alert("Error: " + e);
    })
  }

  delete() {
    this.pokemonService.delete(this.pokemon.id).then((r) => {
      alert("Se ha borrado");
    }).catch(e => {
      alert("Error: " + e);
    })
  }

}
