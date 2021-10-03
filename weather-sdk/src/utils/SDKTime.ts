export class Time {
  public readonly localTime: Date;

  private constructor(time: number, timezone: number) {
    const base = new Date((time + timezone) * 1000);
    this.localTime = new Date(0);
    this.localTime.setHours(base.getUTCHours());
    this.localTime.setMinutes(base.getUTCMinutes());
  }

  public format() {
    return this.localTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  public static build(
    time: number | undefined,
    timezone: number | undefined
  ): Time | undefined {
    if (time == undefined) {
      return undefined;
    }
    return new Time(time, timezone ?? 0);
  }
}
