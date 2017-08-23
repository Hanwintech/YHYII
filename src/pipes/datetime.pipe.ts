import { Injectable, Pipe } from '@angular/core';
/*
  Generated class for the DateTime pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/

@Pipe({
  name: 'datetime'
})
@Injectable()
export class DateTime {
  /*
    Takes a value and makes it lowercase.
   */
  transform(value, args) {
    return new Date(value).toLocaleString();
  }
}
