export enum TemperatureUnit {
  Kelvin,
  Celsius,
  Fahrenheit,
}

export class Temperature {
  private static readonly MAX_FRACTION = 1;
  public value: number;
  public symbol: string;

  constructor(kelvin: number, unit: TemperatureUnit) {
    this.value = Temperature.Convert(kelvin, unit);
    this.symbol = Temperature.Symbol(unit);
  }

  public format() {
    const temperature = this.value.toLocaleString(undefined, {
      maximumFractionDigits: Temperature.MAX_FRACTION,
    });
    return `${temperature}${this.symbol}`;
  }

  public static Convert(kelvin: number, unit: TemperatureUnit): number {
    switch (unit) {
      case TemperatureUnit.Kelvin:
        return kelvin;
      case TemperatureUnit.Celsius:
        return kelvin - 273.15;
      case TemperatureUnit.Fahrenheit:
        return (kelvin * 9) / 5 - 459.67;
    }
  }
  public static Symbol(unit: TemperatureUnit): string {
    switch (unit) {
      case TemperatureUnit.Kelvin:
        return "K";
      case TemperatureUnit.Celsius:
        return "°C";
      case TemperatureUnit.Fahrenheit:
        return "°F";
    }
  }
}
