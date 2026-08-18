import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { FilterQuery, Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { TaskDocument } from './models/task.schema';
import { StatusEnum } from './models/status.enum';
import { CryptoService } from '../../../shared/crypto.service';

const MIGRATION_BATCH_SIZE = 500;

/**
 * Persistence boundary for tasks.
 *
 * Task text is encrypted here on every write and decrypted on every read, so
 * no caller can accidentally persist plaintext. Query fields (userId, date,
 * status, order) stay in the clear because the database has to filter and
 * sort on them.
 */
@Injectable()
export class TasksRepository {
  private readonly logger = new Logger(TasksRepository.name);

  constructor(
    @InjectModel(TaskDocument.name) private readonly model: Model<TaskDocument>,
    private readonly cryptoService: CryptoService,
  ) {}

  async findAllByUserIdAndDate(query: {
    userId: number;
    date: string;
  }): Promise<TaskDocument[]> {
    const tasks = await this.model.find(query, {}, {
      lean: true,
      sort: { order: 1, createdAt: 1 },
    });

    return tasks.map((task) => this.decryptTask(task));
  }

  async getMaxOrder(userId: number, date: string): Promise<number> {
    const task = await this.model.findOne(
      { userId, date },
      { order: 1 },
      { sort: { order: -1 }, lean: true },
    );

    return task?.order ?? -1;
  }

  async create(document: {
    userId: number;
    date: string;
    text: string;
    order: number;
  }): Promise<TaskDocument> {
    const createdDocument = new this.model({
      ...document,
      text: this.cryptoService.encrypt(document.text),
      _id: new Types.ObjectId(),
      createdAt: Date.now(),
    });

    return this.decryptTask((await createdDocument.save()).toJSON());
  }

  async updateText(filter: FilterQuery<TaskDocument>, text: string): Promise<TaskDocument> {
    return this.updateOne(filter, { text: this.cryptoService.encrypt(text) });
  }

  async updateStatus(filter: FilterQuery<TaskDocument>, status: StatusEnum): Promise<TaskDocument> {
    return this.updateOne(filter, { status });
  }

  async moveToDate(
    filter: FilterQuery<TaskDocument>,
    date: string,
    order: number,
  ): Promise<TaskDocument> {
    return this.updateOne(filter, { date, order });
  }

  async deleteOne(filter: FilterQuery<TaskDocument>): Promise<void> {
    await this.model.findOneAndDelete(filter, { lean: true });
  }

  async reorder(userId: number, updates: { _id: string; order: number }[]): Promise<void> {
    if (!updates.length) {
      return;
    }

    await this.model.bulkWrite(
      updates.map(({ _id, order }) => ({
        updateOne: {
          // Scoped by userId so a client can only reorder its own tasks.
          filter: { _id: new Types.ObjectId(_id), userId },
          update: { $set: { order } },
        },
      })),
    );
  }

  /**
   * Idempotent migration of legacy status values to the string enum. Old rows
   * stored a boolean (true = done); some very old ones stored a number.
   */
  async migrateLegacyStatuses(): Promise<void> {
    await this.model.updateMany({ status: { $type: 'bool' } }, [
      { $set: { status: { $cond: ['$status', 'done', 'todo'] } } },
    ]);
    await this.model.updateMany({ status: { $type: 'number' } }, [
      { $set: { status: { $cond: [{ $gte: ['$status', 1] }, 'done', 'todo'] } } },
    ]);
  }

  /**
   * Idempotent migration that encrypts task text written before encryption
   * existed. Encryption happens in the application, so rows must be read,
   * encrypted, and written back rather than transformed by the database.
   */
  async encryptLegacyTexts(): Promise<number> {
    const legacyTasks = await this.model.find(
      { text: { $not: /^enc:v1:/ } },
      { text: 1 },
      { lean: true, limit: MIGRATION_BATCH_SIZE },
    );

    if (!legacyTasks.length) {
      return 0;
    }

    await this.model.bulkWrite(
      legacyTasks.map((task) => ({
        updateOne: {
          filter: { _id: task._id },
          update: { $set: { text: this.cryptoService.encrypt(task.text) } },
        },
      })),
    );

    this.logger.log(`Encrypted ${legacyTasks.length} legacy task(s).`);
    return legacyTasks.length;
  }

  private async updateOne(
    filter: FilterQuery<TaskDocument>,
    update: Partial<TaskDocument>,
  ): Promise<TaskDocument> {
    const document = await this.model.findOneAndUpdate(
      filter,
      { $set: update },
      { lean: true, new: true },
    );

    if (!document) {
      throw new NotFoundException('Task not found.');
    }

    return this.decryptTask(document);
  }

  private decryptTask(task: TaskDocument): TaskDocument {
    return {
      ...task,
      text: this.cryptoService.decryptSafe(task.text, `task ${task._id}`),
    };
  }
}
