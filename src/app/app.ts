import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Pokemon } from './models/pokemon.model';
import { pokemons } from './data/pokemons.data';
import { Filter } from './models/filter.model';
import { PokemonCard } from "./components/pokemon-card/pokemon-card";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PokemonCard, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  filteredPokemons: Pokemon[] = pokemons;
  filter: Filter = {
    name: '',
    type: '',
    weakness: '',
    egg: ''
  }
  types: string[] = [];
  weaknesses: string[] = [];
  eggs: string[] = []

  ngOnInit() {
    this.setDataSources();    
  }
  
  setFilteredPokemons() {
    this.filteredPokemons = pokemons.filter
                            (p => p.name.toLocaleLowerCase().includes(this.filter.name.toLocaleLowerCase())
                                  &&
                                  (!this.filter.type || p.type.includes(this.filter.type))
                                  &&
                                  (!this.filter.weakness || p.weaknesses.includes(this.filter.weakness))
                                  &&
                                  (!this.filter.egg || p.egg == this.filter.egg)
                            );
  }

  

  setDataSources() {
    const typeSet = new Set<string>();
    const weaknessSet = new Set<string>();
    const eggSet = new Set<string>();
    pokemons.forEach(p => {
      p.type.forEach(t => typeSet.add(t));
      p.weaknesses.forEach(w => weaknessSet.add(w));
      eggSet.add(p.egg);
    });
    this.types = Array.from(typeSet.values());
    this.weaknesses = Array.from(weaknessSet.values());
    this.eggs = Array.from(eggSet.values());
  }

}
