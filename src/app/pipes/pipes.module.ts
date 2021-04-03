import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PercentagePipe } from './percentage.pipe';



@NgModule({
  declarations: [PercentagePipe],
  imports: [
    CommonModule
  ],
  exports: [
    PercentagePipe
  ]
})
export class PipesModule { }
