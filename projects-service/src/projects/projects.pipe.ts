import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ProjectPipe implements PipeTransform {
    transform(value: any) {
     if (!value.name || typeof value.name !== 'string') {
      throw new BadRequestException('El nombre del proyecto es obligatorio y debe ser un string');
    }

    // description opcional, pero si viene, tiene que ser string
    if (value.description && typeof value.description !== 'string') {
      throw new BadRequestException('La descripción debe ser un string');
    }

    return {
      name: value.name.trim(),
      description: value.description?.trim() || '',
    };    
}
}