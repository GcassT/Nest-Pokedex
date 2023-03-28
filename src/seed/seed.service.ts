import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { AxiosInstance } from 'axios';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';

@Injectable()
export class SeedService {
  
  private readonly axios: AxiosInstance = axios;

  constructor(
    @InjectModel(Pokemon.name) //Inyecta el modelo de la coleccion
    private readonly pokemonModel: Model<Pokemon> //Modelo de la coleccion
  ){

  }
  
  async executeSeed() {
    const {data} = await this.axios.get('https://pokeapi.co/api/v2/pokemon?limit=10')

    const pokemonToInsert: {no: number, name: string}[] = [];

    data.results.forEach(async({name, url}) => {

      const segments = url.split('/');
      const no: number = +segments[segments.length - 2];

      //const pokemon  = await this.pokemonModel.create({no, name});
      pokemonToInsert.push({no, name});

      
    });

    await this.pokemonModel.insertMany(pokemonToInsert);

    return 'Seed executed';
  }

}
