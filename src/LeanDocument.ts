import * as mongoose from 'mongoose';

export type LeanDocument<T extends mongoose.Document> = Omit<T, keyof mongoose.Document>;