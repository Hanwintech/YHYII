import { Component, } from '@angular/core';

@Component({
  selector: 'm-label',
  template: `<button #mLable id="{{ id }}" (click)="onclick()"></button>`,
})
export class MLabelComponent {
  public id: string;
  constructor() { }
  onclick() { console.log("Not Implimented!"); }
}