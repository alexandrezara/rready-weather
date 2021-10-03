export enum TemperatureUnit {
  Kelvin,
  Celsius,
  Fahrenheit,
}

export class Temperature {
  private static readonly MAX_FRACTION = 1;
  public value: number;
  public unit: TemperatureUnit;

  private constructor(kelvin: number, unit: TemperatureUnit) {
    this.value = Temperature.convert(kelvin, unit);
    this.unit = unit;
  }

  public format() {
    const numeric = this.value.toLocaleString(undefined, {
      maximumFractionDigits: Temperature.MAX_FRACTION,
    });
    switch (this.unit) {
      case TemperatureUnit.Kelvin:
        return `${numeric}K`;
      case TemperatureUnit.Celsius:
        return `${numeric}°C`;
      case TemperatureUnit.Fahrenheit:
        return `${numeric}°F`;
    }
  }

  public static build(
    kelvin: number | undefined,
    unit: TemperatureUnit | undefined
  ): Temperature | undefined {
    if (kelvin == undefined) {
      return undefined;
    }
    return new Temperature(kelvin, unit ?? TemperatureUnit.Celsius);
  }

  private static convert(kelvin: number, unit: TemperatureUnit): number {
    switch (unit) {
      case TemperatureUnit.Kelvin:
        return kelvin;
      case TemperatureUnit.Celsius:
        return kelvin - 273.15;
      case TemperatureUnit.Fahrenheit:
        return (kelvin * 9) / 5 - 459.67;
    }
  }
}
