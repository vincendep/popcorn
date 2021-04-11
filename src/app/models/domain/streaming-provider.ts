export class StreamingProvider {
  readonly id: string
  readonly name: string
  readonly logo: string
  readonly displayPriority: number

  private constructor() {}

  static comparator() {
    return (wp1: StreamingProvider, wp2: StreamingProvider) => wp2.displayPriority - wp1.displayPriority
  }
}

export class MovieStreamingProviders {
  readonly rentProviders: StreamingProvider[]
  readonly buyProviders: StreamingProvider[]
  readonly flatrateProviders: StreamingProvider[]

  constructor(rentProviders: StreamingProvider[], buyProviders: StreamingProvider[], flatrateProviders: StreamingProvider[]) {
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
