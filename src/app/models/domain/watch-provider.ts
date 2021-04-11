export class WatchProvider {
  readonly id: string
  readonly name: string
  readonly logo: URL
  readonly displayPriority: number

  private constructor() {}

  static comparator() {
    return (wp1: WatchProvider, wp2: WatchProvider) => wp2.displayPriority - wp1.displayPriority
  }
}

export interface MovieWatchProviders {
  rent: Array<WatchProvider>
  buy: Array<WatchProvider>
  flatrate: Array<WatchProvider>
}
