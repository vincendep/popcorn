export class WatchProvider {
  readonly id: string
  readonly name: string
  readonly logo: string
  readonly displayPriority: number

  private constructor() {}

  static from(watchProvider: WatchProvider): WatchProvider {
    return {
      id: watchProvider.id,
      name: watchProvider.name,
      logo: watchProvider.logo,
      displayPriority: watchProvider.displayPriority
    };
  }

  static comparator() {
    return (wp1: WatchProvider, wp2: WatchProvider) => wp1.displayPriority - wp2.displayPriority
  }
}

export class MovieWatchAvailability {
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
