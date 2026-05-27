import {Injectable, NotFoundException} from '@nestjs/common'
import {FilterQuery, Model, Types, UpdateQuery} from 'mongoose'
import {InjectModel} from '@nestjs/mongoose'
import {TaskDocument} from "./models/task.schema";

@Injectable()
export class TasksRepository {
  constructor(
      @InjectModel(TaskDocument.name) private model: Model<TaskDocument>,
  ) {}

  async findAllByUserIdAndDate(query: { userId: number, date: string }): Promise<TaskDocument[]> {
    return this.model.find(query, {}, { lean: true, sort: { order: 1, createdAt: 1 } });
  }

  async getMaxOrder(userId: number, date: string): Promise<number> {
    const task = await this.model.findOne({ userId, date }, { order: 1 }, { sort: { order: -1 }, lean: true });
    return task ? (task.order ?? -1) : -1;
  }

  async create(document: Omit<TaskDocument, '_id' | 'createdAt' | 'status' | 'order'> & { userId: number, date: string, order: number }): Promise<TaskDocument> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
      createdAt: Date.now(),
    });
    return (await createdDocument.save()).toJSON();
  }

  async findOneAndUpdate<TDocument>(filterQuery: FilterQuery<TDocument>, update: UpdateQuery<TDocument>): Promise<TDocument> {
    const document = await this.model.findOneAndUpdate(filterQuery, update, {
      lean: true,
      new: true,
    });

    if (!document) {
      throw new NotFoundException('Document not found.');
    }

    return document as TDocument;
  }

  async findOneAndDelete<TDocument>(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    return this.model.findOneAndDelete(filterQuery, { lean: true }) as unknown as TDocument;
  }

  async findOneAndMarkAs<TDocument>(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    const document = await this.model.findOneAndUpdate(
      filterQuery,
      [{ $set: { status: { $eq: [false, '$status'] } } }],
      { lean: true, new: true },
    );

    if (!document) {
      throw new NotFoundException('Document not found.');
    }

    return document as TDocument;
  }

  async reorder(updates: { _id: string; order: number }[]): Promise<void> {
    const bulkOps = updates.map(({ _id, order }) => ({
      updateOne: {
        filter: { _id: new Types.ObjectId(_id) },
        update: { $set: { order } },
      },
    }));
    await this.model.bulkWrite(bulkOps);
  }
}
