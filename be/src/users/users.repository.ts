import {Injectable} from '@nestjs/common'
import {Model, Types} from 'mongoose'
import {UserDocument} from './models/user.schema'
import { InjectModel } from '@nestjs/mongoose'

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(UserDocument.name) private model: Model<UserDocument>) {}

  async create(document: Omit<UserDocument, '_id' | 'createdAt'>): Promise<UserDocument> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
      createdAt: Date.now()
    })
    return (await createdDocument.save()).toJSON()
  }

  // async findOne(date: string): Promise<UserDocument> {
    // const document = await this.model.findOne({date}, {}, {lean: true})

    // if (!document) {
    // }
    // return document
  // }
}
