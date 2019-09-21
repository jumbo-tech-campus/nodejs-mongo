import {StatsD} from 'hot-shots';
import {Measurable} from './Measurable';

export class AsyncMeasurer {
  private readonly statsD: StatsD;

  public constructor(statsD: StatsD) {
    this.statsD = statsD;
  }

  public async measure<T>(measurable: Measurable<T>, defaultTags: Record<string, string> = {}): Promise<T> {
    const before = Date.now();

    return await measurable.execute()
      .finally(() => {
        this.statsD.timing(
          measurable.statName.toLowerCase(),
          Date.now() - before,
          {
            ...defaultTags,
            ...measurable.tags,
          });
      });
  }
}