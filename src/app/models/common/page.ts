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
