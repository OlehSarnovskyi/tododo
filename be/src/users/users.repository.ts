import {Injectable, NotFoundException} from '@nestjs/common'
import {Model, Types} from 'mongoose'
import {UserDocument} from './models/user.schema'
import { InjectModel } from '@nestjs/mongoose'

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(UserDocument.name) private model: Model<UserDocument>) {}

  async create(document: Omit<UserDocument, '_id' | 'createdAt'>): Promise<string> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
      createdAt: Date.now()
    });
    (await createdDocument.save()).toJSON()
    return await 'Accout has been created'
  }

  async findOne(id: number): Promise<UserDocument> {
    const document = await this.model.findOne({id}, {}, {lean: true})

    if (!document) {
      throw new NotFoundException()
    }
    return document
  }
}
