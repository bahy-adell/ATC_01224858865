import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customeDate'
})
export class CustomeDatePipe implements PipeTransform {

transform(value: string | Date): string {
    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
    return new Date(value).toLocaleString('en-US', options);
  }


}
