import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ValidateNumberPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value) {
      const check = isNaN(Number(value.toString()));
      if (!check) {
        return Number(value.toString());
      }
      return null;
    }
    return null;
  }
}
