import {MongoQueryExecutor} from '../src/MongoQueryExecutor';
import {AsyncMeasurer} from '@jtc/common';
import * as mongoose from 'mongoose';

describe('A MongoQueryExecutor', () => {
  const asyncMeasurerMock = {} as AsyncMeasurer;
  const mongooseModelMock = {} as mongoose.Model<mongoose.Document>;

  const mongoQueryExecutor = new MongoQueryExecutor({
    asyncMeasurer: asyncMeasurerMock,
    model:         mongooseModelMock,
  });

  beforeEach(() => {
    asyncMeasurerMock.measure = (measurable) => measurable.execute();
    mongooseModelMock.exists  = () => Promise.resolve(true);
  });

  describe('When querying', () => {
    let result: boolean;

    beforeEach(async () => {
      spyOn(asyncMeasurerMock, 'measure').and.callThrough();

      result = await mongoQueryExecutor.execute('queryName', (model) => model.exists({}));
    });

    it('Returns the query result', () => {
      expect(result).toEqual(true);
    });

    it('Creates a valid Measurable', () => {
      expect(asyncMeasurerMock.measure).toHaveBeenCalledWith({
        tags:     {
          result: 'success',
          type:   'queryName',
        },
        statName: 'MongoQuery',
        execute:  jasmine.any(Function),
      });
    });
  });

  describe('Throwing a query error', () => {
    let error: Error;

    beforeEach(async () => {
      spyOn(asyncMeasurerMock, 'measure').and.callThrough();
      mongooseModelMock.exists = () => Promise.reject(new Error('MongoError'));

      await mongoQueryExecutor.execute('queryName', (model) => model.exists({})).catch((ex) => {
        error = ex;
      });
    });

    it('Returns the query result', () => {
      expect(error.name).toEqual('MongoQueryError');
    });

    it('Creates a valid Measurable', () => {
      expect(asyncMeasurerMock.measure).toHaveBeenCalledWith({
        tags:     {
          result: 'Error',
          type:   'queryName',
        },
        statName: 'MongoQuery',
        execute:  jasmine.any(Function),
      });
    });
  });
});