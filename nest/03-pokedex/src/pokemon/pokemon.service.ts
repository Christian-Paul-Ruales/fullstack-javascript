import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PokemonService {
  private defaultLimit: number;
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly configService: ConfigService,
  ){
    this.defaultLimit = this.configService.get<number>('defaultLimit');
  }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();
    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      this.handleException(error);

    }
    
  }

  
  findAll(paginationDTO: PaginationDto) {

    const {limit = +this.configService.get<number>('defaultLimit'), offset = 0} = paginationDTO;
    
    return this.pokemonModel.find()
    .limit(limit)
    .skip(offset)// offset
    .sort({no: 1})
    .select('-__v') 
    ;
  }

  /***
   * No se va a buscar por id si no por un termino de busqueda
   */
  async findOne(id: string) {
    let pokemon: Pokemon; //pokemon tipo entity pokemon
    // si es un numero busca por no
    if(!isNaN(+id)){
      pokemon = await this.pokemonModel.findOne({no: id});
    }
    // si es un id de mongo busca por id
    if(!pokemon && isValidObjectId(id)){
      pokemon = await this.pokemonModel.findById(id);
    }
    if(!pokemon) {
      pokemon = await this.pokemonModel.findOne({name: id});

    } 
    if( !pokemon) throw new NotFoundException(`Pokemon whit id, name or no ${id} not found`);
    
    // mongo
    

    return pokemon;
  }

  async update(id: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(id); // se debe llamar con await
    
    try {
      if( updatePokemonDto.name)
        updatePokemonDto.name = updatePokemonDto.name.toLowerCase();

      await pokemon.updateOne(updatePokemonDto, {new: true});
  
      return {...await pokemon.toJSON, updatePokemonDto};
    
    } catch (error) {
      this.handleException(error);
    }
    
  }

  async remove(id: string) {
    //const pokemon = await this.findOne(id);
    //await pokemon.deleteOne();
    //const result = await this.pokemonModel.findByIdAndDelete(id);
    
    const {deletedCount} = await this.pokemonModel.deleteOne({_id: id});
    if(deletedCount === 0) throw new BadRequestException(`Pokemon with id ${id} not found`);
    return deletedCount;

  }

  handleException(error: any){
    if(error.code === 11000){
      throw new BadRequestException(`Pokemo exists in db ${JSON.stringify(error.keyValue)}`);
    }
    console.error(error);
    throw new InternalServerErrorException(`Can't create pokemon - Chek server logs`)
  }
}
