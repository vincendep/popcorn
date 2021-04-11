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

export class MovieWatchProviders {
  readonly rentProviders: WatchProvider[]
  readonly buyProviders: WatchProvider[]
  readonly flatrateProviders: WatchProvider[]

  constructor(rentProviders: WatchProvider[], buyProviders: WatchProvider[], flatrateProviders: WatchProvider[]) {
    this.rentProviders = rentProviders
    this.buyProviders = buyProviders
    this.flatrateProviders = flatrateProviders
  }

  hasAnyProvider() {
    return this.hasRentProviders() || this.hasBuyProviders() || this.hasFlatrateProviders()
  }

  hasRentProviders() {
    return this.rentProviders?.length > 0
  }

  hasBuyProviders() {
    return this.buyProviders?.length > 0
  }

  hasFlatrateProviders() {
    return this.flatrateProviders?.length > 0
  }
}
