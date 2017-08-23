import { DateTime } from './datetime.pipe';
import { Keys } from './keys.pipe';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [Keys, DateTime],
  exports: [Keys, DateTime]
})
export class PipesModule { }