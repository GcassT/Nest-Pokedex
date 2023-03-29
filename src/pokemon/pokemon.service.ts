import { Injectable } from '@nestjs/common';
import { Query } from '@nestjs/common/decorators';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId,Model } from 'mongoose';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { PaginationDto } from '../common/dto/pagination.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PokemonService {

  private defaultLimit: number;

  //Injeccion de dependencias
  constructor (
    @InjectModel(Pokemon.name) //Inyecta el modelo de la coleccion
    private readonly pokemonModel: Model<Pokemon>, //Modelo de la coleccion

    private readonly configService: ConfigService,
  ) {

     this.defaultLimit = configService.get<number>('defaultLimit');

  }



  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();
    try { //Intenta crear un pokemon
    
    const pokemon =  await this.pokemonModel.create(createPokemonDto); //Crea un pokemon en la coleccion
    return pokemon;

    } catch (error) { //Si hay un error
      this.handleExceptions(error);
    }
  }

  findAll(paginationDto: PaginationDto) {

    const {limit = this.defaultLimit, offset = 0} = paginationDto;
    return this.pokemonModel.find()
    .limit(limit)
    .skip(offset)
    .sort({no: 1})
    .select(-'__v');
  }

  async findOne(id: string) {

    let pokemon: Pokemon;

    if (!isNaN(+id)) { //Si el id no es un numero
      pokemon = await this.pokemonModel.findOne({no: id})
    }

    //Verificación del mongoID
    if (!pokemon && isValidObjectId(id) ) {
      pokemon = await this.pokemonModel.findById(id);
    }

    //Verificcion del nombre
    if ( !pokemon) {
      pokemon = await this.pokemonModel.findOne({name: id.toLowerCase().trim()});
    }

    if (!pokemon) { //Si el pokemon no existe
      throw new BadRequestException(`El pokemon con el id ${id} no existe`);
    }


    return pokemon;
    
  }

  async update(id: string, updatePokemonDto: UpdatePokemonDto) {

    const pokemon = await this.pokemonModel.findOne({id});//Busca el pokemon por el numero
    if (updatePokemonDto.name)  //Si el nombre existe
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
    
    try {
      await pokemon.updateOne(updatePokemonDto, {new: true}); //Actualiza el pokemon
      return {...pokemon.toJSON,...updatePokemonDto};

    } catch (error) { //Si hay un error
      this.handleExceptions(error);
    }
  
    await pokemon.updateOne(updatePokemonDto, {new: true}); //Actualiza el pokemon

    return {...pokemon.toJSON,...updatePokemonDto};

  }

  async remove(id: string) {

    //const pokemon = await this.findOne(id); //Busca el pokemon por el numero
    //await pokemon.deleteOne(); //Elimina el pokemon
    //const result = await this.pokemonModel.findByIdAndDelete(id);
    const {deletedCount} = await this.pokemonModel.deleteOne({_id: id});

    if(deletedCount === 0) {
      throw new BadRequestException(`El pokemon con el id ${id} no existe`);
    }

    return {deleted: true};

  }

  private handleExceptions(error: any) {

    if (error.code === 11000) {
      throw new BadRequestException (`El pokemon ya existe en la base de datos ${JSON.stringify(error.keyValue)}}`);
    }
    throw new InternalServerErrorException('Error al crear el pokemon');
  }
}
