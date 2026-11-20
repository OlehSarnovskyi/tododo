import { BadRequestException, Injectable, Logger, OnModuleInit } from '@nestjs/common';

import { OpenTasks, TasksRepository } from './tasks.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskDocument } from './models/task.schema';
import { ReorderTaskItemDto } from './dto/reorder-tasks.dto';
import { StatusEnum } from './models/status.enum';

/** Keeps a day list short enough to stay useful, and caps abuse per day. */
export const MAX_TASKS_PER_DAY = 20;

/** Per section on the open tasks page; the totals still report the full count. */
const OPEN_TASKS_LIMIT = 100;

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

  async findOpen(userId: number, today: string): Promise<OpenTasks> {
    return this.tasksRepository.findOpenAround(userId, this.parseDay(today), OPEN_TASKS_LIMIT);
  }

  async create(userId: number, createTaskDto: CreateTaskDto): Promise<TaskDocument> {
    await this.assertDayHasRoom(userId, createTaskDto.date);

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
    // Checked here too, otherwise the cap could be walked around by moving
    // tasks onto an already full day.
    await this.assertDayHasRoom(userId, date);

    const maxOrder = await this.tasksRepository.getMaxOrder(userId, date);

    return this.tasksRepository.moveToDate({ _id, userId }, date, maxOrder + 1);
  }

  async remove(_id: string, userId: number): Promise<void> {
    await this.tasksRepository.deleteOne({ _id, userId });
  }

  async reorder(userId: number, tasks: ReorderTaskItemDto[]): Promise<void> {
    await this.tasksRepository.reorder(userId, tasks);
  }

  /** DD.MM.YYYY to UTC midnight, the same instant $dateFromString produces. */
  private parseDay(value: string): Date {
    const [day, month, year] = value.split('.').map(Number);
    const date = new Date(Date.UTC(year, month - 1, day));

    // Date.UTC rolls 31.02 over into March; reject instead of guessing.
    if (date.getUTCDate() !== day || date.getUTCMonth() !== month - 1) {
      throw new BadRequestException(`${value} is not a valid date.`);
    }

    return date;
  }

  private async assertDayHasRoom(userId: number, date: string): Promise<void> {
    const count = await this.tasksRepository.countByUserAndDate(userId, date);

    if (count >= MAX_TASKS_PER_DAY) {
      throw new BadRequestException(
        `A day can hold up to ${MAX_TASKS_PER_DAY} tasks.`,
      );
    }
  }
}
