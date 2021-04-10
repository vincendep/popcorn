import { i18nMetaToJSDoc } from "@angular/compiler/src/render3/view/i18n/meta"

export class Page<T> {
  readonly number: number
  readonly totalPages: number
  readonly totalElements: number
  readonly elements: Array<T>

  constructor(number: number, totalPages: number, totalElements: number, elements: T[]) {
    this.number = number
    this.totalPages = totalPages
    this.totalElements = totalElements
    this.elements = elements
  }
}
