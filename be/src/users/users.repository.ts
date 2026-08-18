import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { UserDocument } from './models/user.schema';
import { CryptoService } from '../shared/crypto.service';

const MIGRATION_BATCH_SIZE = 500;

/**
 * Persistence boundary for users. Personal fields (names, username) are
 * encrypted at rest; the Telegram id stays in the clear because every lookup
 * filters on it.
 */
@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(UserDocument.name) private readonly model: Model<UserDocument>,
    private readonly cryptoService: CryptoService,
  ) {}

  async create(document: Omit<UserDocument, '_id' | 'createdAt'>): Promise<void> {
    const createdDocument = new this.model({
      ...document,
      first_name: this.cryptoService.encrypt(document.first_name),
      last_name: document.last_name
        ? this.cryptoService.encrypt(document.last_name)
        : undefined,
      username: this.cryptoService.encrypt(document.username),
      _id: new Types.ObjectId(),
      createdAt: Date.now(),
    });

    await createdDocument.save();
  }

  async exists(id: number): Promise<boolean> {
    return (await this.model.exists({ id })) !== null;
  }

  /**
   * Idempotent migration that encrypts profiles stored before encryption
   * existed. Encryption happens in the application, so rows are read,
   * encrypted, and written back rather than transformed by the database.
   */
  async encryptLegacyProfiles(): Promise<number> {
    const legacyUsers = await this.model.find(
      { username: { $not: /^enc:v1:/ } },
      { first_name: 1, last_name: 1, username: 1 },
      { lean: true, limit: MIGRATION_BATCH_SIZE },
    );

    if (!legacyUsers.length) {
      return 0;
    }

    await this.model.bulkWrite(
      legacyUsers.map((user) => ({
        updateOne: {
          filter: { _id: user._id },
          update: {
            $set: {
              first_name: this.cryptoService.encrypt(user.first_name),
              username: this.cryptoService.encrypt(user.username),
              ...(user.last_name
                ? { last_name: this.cryptoService.encrypt(user.last_name) }
                : {}),
            },
          },
        },
      })),
    );

    return legacyUsers.length;
  }
}
