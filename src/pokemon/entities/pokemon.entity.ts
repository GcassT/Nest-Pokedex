import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Prop } from '@nestjs/mongoose/dist';
import { Document } from 'mongoose';


@Schema()
export class Pokemon extends Document{


    // id: string; MongoDB will generate this for us
    @Prop({
        unique: true,//No se puede repetir
        index: true,//Se puede buscar por este campo
    })
    name: string;

    @Prop({
        unique: true,
        index: true,
    })
    no: number;

}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon); //Este el esquema que se le pasa a la clase Pokemon