import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { PokemonService } from '../pokemon/pokemon.service';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;
  

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly httpAdapter: AxiosAdapter,
  ){}

  async executeSeed() {
    /**
     * Delete * from pokemons
     * NO RECOMENDADO: ESTO BORRA TODOS LOS DATOS DE LA TABLA, SOLO EN PRUEBAS
     */
    await this.pokemonModel.deleteMany({});

    const data = await this.httpAdapter.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');
    
    const pokemonToInsert: {name: string; no: number}[] = [];

    data.results.forEach(
      async({name, url}) => {
        const segments = url.split('/');
        const no = +segments[segments.length -2];
        
        pokemonToInsert.push({name, no});
      }
    );

    await this.pokemonModel.insertMany(pokemonToInsert);
 
    return `Seed executed succesfully`;
  }


  /***
   * Insercion masiva muy basica
   */
  async executeBasicInsertSeed() {
    /**
     * Delete * from pokemons
     * NO RECOMENDADO: ESTO BORRA TODOS LOS DATOS DE LA TABLA, SOLO EN PRUEBAS
     */
    await this.pokemonModel.deleteMany({});

    const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=10');
    
    const insertPromisesArray: Promise<Pokemon>[] = [];

    data.results.forEach(
      async({name, url}) => {
        const segments = url.split('/');
        const no = +segments[segments.length -2];
        
        insertPromisesArray.push(this.pokemonModel.create({name, no}));
      }
    );
    /***
     * Espera que las promesas se arreglen
     */
    await Promise.all(insertPromisesArray);
    
    return `Seed executed succesfully`;
  }
}
