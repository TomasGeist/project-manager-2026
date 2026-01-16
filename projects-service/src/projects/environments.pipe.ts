import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class EnvironmentPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value.name || typeof value.name !== 'string') {
      throw new BadRequestException('El nombre del environment es obligatorio y debe ser un string');
    }

    if (!value.healthUrl || typeof value.healthUrl !== 'string') {
      throw new BadRequestException('El healthUrl es obligatorio y debe ser un string');
    }

    return {
      name: value.name.trim(),
      healthUrl: value.healthUrl.trim(),
    };
  }
}