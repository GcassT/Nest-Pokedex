import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';
import { BadRequestException } from '@nestjs/common/exceptions';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {

  //transfor es el metodo que se ejecuta cuando se usa el pipe en un controlador o en un metodo.
  //value es el valor que se pasa al pipe
  //metadata es la metadata del argumento que se pasa al pipe
  transform(value: string, metadata: ArgumentMetadata) {
    //console.log({value, metadata})

    if (!isValidObjectId(value)) {
      throw new BadRequestException(`${value} no es un id de mongo válido`);
    }

    return value;
  }
}
