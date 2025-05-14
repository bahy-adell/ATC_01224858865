import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'description'
})
export class DescriptionPipe implements PipeTransform {

  transform(value: string, length: number): string {
    return value.split(" ").slice(0, length).join(" ") + "...";
  }

}
