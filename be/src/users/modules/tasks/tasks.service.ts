import { Injectable } from '@nestjs/common';

import { TasksRepository } from './tasks.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskDocument } from './models/task.schema';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ReorderTaskItemDto } from './dto/reorder-tasks.dto';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}

  async findAllByUserIdAndDate(query: { userId: number; date: string }): Promise<TaskDocument[]> {
    return await this.tasksRepository.findAllByUserIdAndDate(query);
  }

  async create(createTaskDto: CreateTaskDto) {
    const maxOrder = await this.tasksRepository.getMaxOrder(createTaskDto.userId, createTaskDto.date);
    return await this.tasksRepository.create({ ...createTaskDto, order: maxOrder + 1 });
  }

  async update(_id: string, userId: number, updateTaskDto: UpdateTaskDto) {
    return await this.tasksRepository.findOneAndUpdate(
      { _id, userId },
      { $set: updateTaskDto },
    );
  }

  async remove(_id: string, userId: number) {
    return await this.tasksRepository.findOneAndDelete({ _id, userId });
  }

  async markAs(_id: string, userId: number) {
    return await this.tasksRepository.findOneAndMarkAs({ _id, userId });
  }

  async move(_id: string, userId: number, date: string) {
    const maxOrder = await this.tasksRepository.getMaxOrder(userId, date);
    return await this.tasksRepository.findOneAndUpdate(
      { _id, userId },
      { $set: { date, order: maxOrder + 1 } },
    );
  }

  async reorder(tasks: ReorderTaskItemDto[]): Promise<void> {
    await this.tasksRepository.reorder(tasks);
  }
}
