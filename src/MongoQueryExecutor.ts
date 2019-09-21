import * as mongoose from 'mongoose';
import {AsyncMeasurer, Measurable} from '@jtc/common';

interface MongoQueryExecutorParameters<MongoDocument extends mongoose.Document> {
  asyncMeasurer: AsyncMeasurer;
  model: mongoose.Model<MongoDocument>;
}

export class MongoQueryExecutor<MongoDocument extends mongoose.Document> {
  private readonly asyncMeasurer: AsyncMeasurer;
  private readonly model: mongoose.Model<MongoDocument>;

  public constructor({asyncMeasurer, model}: MongoQueryExecutorParameters<MongoDocument>) {
    this.asyncMeasurer = asyncMeasurer;
    this.model         = model;
  }

  public async execute<T>(queryName: string, queryFunction: (model: mongoose.Model<MongoDocument>) => Promise<T>): Promise<T> {
    const tags: Record<string, string> = {
      result: 'notexecuted',
      type:   queryName,
    };

    const measurable: Measurable<T> = {
      tags:     tags,
      statName: 'MongoQuery',
      execute:  async () => {
        try {
          const result = await queryFunction(this.model);

          tags.result = 'success';

          return result;
        } catch (error) {
          tags.result = error.name;

          throw error;
        }
      },
    };

    return await this.asyncMeasurer.measure(measurable);
  }
}