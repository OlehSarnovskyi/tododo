import { Injectable, Logger, OnModuleInit } from '@nestjs/common';

import { TasksRepository } from './tasks.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskDocument } from './models/task.schema';
import { ReorderTaskItemDto } from './dto/reorder-tasks.dto';
import { StatusEnum } from './models/status.enum';

@Injectable()
export class TasksService implements OnModuleInit {
  private readonly logger = new Logger(TasksService.name);

  constructor(private readonly tasksRepository: TasksRepository) {}

  async onModuleInit(): Promise<void> {
    try {
      await this.tasksRepository.migrateLegacyStatuses();
      await this.tasksRepository.encryptLegacyTexts();
    } catch (error) {
      // A failed migration must not stop the app from serving requests.
      this.logger.error(`Startup migration failed: ${error.message}`);
    }
  }

  async findAllByUserIdAndDate(userId: number, date: string): Promise<TaskDocument[]> {
    return this.tasksRepository.findAllByUserIdAndDate({ userId, date });
  }

  async create(userId: number, createTaskDto: CreateTaskDto): Promise<TaskDocument> {
    const maxOrder = await this.tasksRepository.getMaxOrder(userId, createTaskDto.date);

    return this.tasksRepository.create({
      ...createTaskDto,
      userId,
      order: maxOrder + 1,
    });
  }

  async rename(_id: string, userId: number, text: string): Promise<TaskDocument> {
    return this.tasksRepository.updateText({ _id, userId }, text);
  }

  async setStatus(_id: string, userId: number, status: StatusEnum): Promise<TaskDocument> {
    return this.tasksRepository.updateStatus({ _id, userId }, status);
  }

  async move(_id: string, userId: number, date: string): Promise<TaskDocument> {
    const maxOrder = await this.tasksRepository.getMaxOrder(userId, date);

    return this.tasksRepository.moveToDate({ _id, userId }, date, maxOrder + 1);
  }

  async remove(_id: string, userId: number): Promise<void> {
    await this.tasksRepository.deleteOne({ _id, userId });
  }

  async reorder(userId: number, tasks: ReorderTaskItemDto[]): Promise<void> {
    await this.tasksRepository.reorder(userId, tasks);
  }
}
