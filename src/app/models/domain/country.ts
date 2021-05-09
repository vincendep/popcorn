export class Country {
  static readonly IT: Country = {numeric: 380, alpha2: 'IT', alpha3: 'ITA', name: 'Italy'}
  static readonly US: Country = {numeric: 840, alpha2: 'US', alpha3: 'USA', name: 'United States'}
  static readonly GB: Country = {numeric: 826, alpha2: 'GB', alpha3: 'GBR', name: 'United Kingdom'}
  static readonly DE: Country = {numeric: 276, alpha2: 'DE', alpha3: 'DEU', name: 'Germany'}
  static readonly ES: Country = {numeric: 724, alpha2: 'ES', alpha3: 'ESP', name: 'Spain'}
  static readonly FR: Country = {numeric: 250, alpha2: 'FR', alpha3: 'FRA', name: 'France'}

  readonly numeric: number
  readonly alpha2: string
  readonly alpha3: string
  readonly name: string

  private constructor() {}

  public static comparator() {
    return (c1: Country, c2: Country) => c1.name.localeCompare(c2.name)
  }
}
