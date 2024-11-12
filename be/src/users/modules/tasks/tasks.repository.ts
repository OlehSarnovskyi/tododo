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
    return this.model.find(query, {}, { lean: true });
  }

  async create(document: Omit<TaskDocument, '_id' | 'createdAt' | 'status'> & { userId: number, date: string }): Promise<TaskDocument> {

    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
      createdAt: Date.now()
    })
    return (await createdDocument.save()).toJSON()
  }

  async findOneAndUpdate<TDocument>(filterQuery: FilterQuery<TDocument>, update: UpdateQuery<TDocument>): Promise<TDocument> {
    const document = await this.model.findOneAndUpdate(filterQuery, update, {
      lean: true,
      new: true
    })

    if (!document) {
      throw new NotFoundException('Document not found.')
    }

    return document as TDocument
  }

  async findOneAndDelete<TDocument>(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    return this.model.findOneAndDelete(filterQuery, {lean: true}) as unknown as TDocument
  }

  // mask as done/active
}
