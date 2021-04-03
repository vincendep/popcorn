import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'percentage'
})
export class PercentagePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): number {
    if (value >= 0 && value <= 1) {
      return Math.floor(value * 100)
    } else if (value <= 10) {
      return Math.floor(value / 10 * 100)
    } else if (value <= 100) {
      return Math.floor(value)
    } else {
      throw new Error(`Cannot calculate percentage of ${value}`)
    }
  }
}
