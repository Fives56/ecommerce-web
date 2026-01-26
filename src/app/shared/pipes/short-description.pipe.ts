import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortDescription'
})
export class ShortDescriptionPipe implements PipeTransform {
  /**
   * Shorten a string to a given length
   * @param value - The string to shorten
   * @param limit - The maximum length of the string
   * @returns The shortened string
   */
  transform(value: string | undefined | null, limit: number = 15): string {
    if (!value) return '';

    if (value.length <= limit) {
      return value;
    }

    return value.substring(0, limit) + '...';
  }

}
