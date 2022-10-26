import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from "rxjs/operators";
import { Pokemon } from '../interfaces/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private db: AngularFirestore) { }

  public getAllSnapshot() {
    return this.db.collection("pokemons").snapshotChanges().pipe(map(res => {
      return res.map(a => {
        const data = a.payload.doc.data() as Pokemon;
        data.id = a.payload.doc.id;
        return data;
      })
    }));
  }

  public getAll() {
    return this.db.collection("pokemons").get().pipe(map(res => {
      return res.docs.map(a => {
        const data = a.data() as Pokemon;
        data.id = a.id;
        return data;
      })
    }));
  }

  public get(id) {
    return this.db.collection("pokemons").doc(id).get().pipe(map(res => {
      return res.data() as Pokemon;
    }));
  }

  public getFromName(name) {
    return this.db.collection("pokemons", ref => ref.where("name","==",name)).get().pipe(map(res => {
      return res.docs.map(a => {
        const data = a.data() as Pokemon;
        data.id = a.id;
        return data;
      })
    }));
  }

  update(pokemon:Pokemon) {
    return this.db.collection("pokemons").doc(pokemon.id).update({
      name: pokemon.name,
      type1: pokemon.type1,
      type2: pokemon.type2,
      nickname: pokemon.nickname,
      level: pokemon.level,
      shiny: pokemon.shiny,
      updatedDate: new Date()
    })
  }

  delete(id) {
    return this.db.collection("pokemons").doc(id).delete();
  }

  add(pokemon:Pokemon) {
    pokemon.id=this.db.createId();
    return this.db.collection("pokemons").doc(pokemon.id).set({
      id: pokemon.id,
      name: pokemon.name,
      type1: pokemon.type1,
      type2: pokemon.type2,
      nickname: pokemon.nickname,
      level: pokemon.level,
      shiny: pokemon.shiny,
      
      createdDate: new Date()
    })
  }

  
}
