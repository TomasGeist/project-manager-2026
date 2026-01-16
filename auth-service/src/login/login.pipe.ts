import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class LoginPipe implements PipeTransform {
    transform(value: any) {
    if (!value.email || !value.password) {
      // Para el MVP simplemente lanzo una excepción si falta algún campo obligatorio. (No será la misma respuesta estandar pero para optimizar el tiempo de desarrollo lo dejo así).
      throw new BadRequestException('Email y password son obligatorios');
    }

    if (value.email.includes('@') === false) {
      throw new BadRequestException('Email inválido');
    }

    if (value.password.length < 5) {
      throw new BadRequestException('Minimo 5 caracteres en la contraseña');
    }

    return {
      email: String(value.email).trim(),
      password: String(value.password).trim()
    };
}
}