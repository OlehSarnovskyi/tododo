import {Injectable} from '@nestjs/common'
import {Model, Types} from 'mongoose'
import {InjectModel} from '@nestjs/mongoose'
import {TaskDocument} from "./models/task.schema";

@Injectable()
export class TasksRepository {
  constructor(@InjectModel(TaskDocument.name) private model: Model<TaskDocument>) {}

  async create(document: Omit<TaskDocument, '_id' | 'createdAt'>): Promise<TaskDocument> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
      createdAt: Date.now()
    })
    return (await createdDocument.save()).toJSON()
  }

  // from service
}
