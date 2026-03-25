import { Injectable } from '@nestjs/common';

import { TasksRepository } from './tasks.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskDocument } from './models/task.schema';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}

  async findAllByUserIdAndDate(query: {
    userId: number;
    date: string;
  }): Promise<TaskDocument[]> {
    return await this.tasksRepository.findAllByUserIdAndDate(query);
  }

  async create(createTaskDto: CreateTaskDto) {
    return await this.tasksRepository.create(createTaskDto);
  }

  async update(_id: string, updatePostDto: UpdateTaskDto) {
    return await this.tasksRepository.findOneAndUpdate(
      { _id },
      { $set: updatePostDto },
    );
  }

  async remove(_id: string) {
    return await this.tasksRepository.findOneAndDelete({ _id });
  }

  async markAs(_id: string) {
    return await this.tasksRepository.findOneAndMarkAs({ _id });
  }
}
