import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';
import { TaskDocument } from './models/task.schema';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async findAllTasksByUserIdAndDate(
    @Query() query: { userId: number; date: string },
  ): Promise<TaskDocument[]> {
    return this.tasksService.findAllByUserIdAndDate(query);
  }

  @Post('add')
  async addTask(@Body() taskDto: CreateTaskDto): Promise<void> {
    await this.tasksService.create(taskDto);
  }

  // delete

  // edit

  // mask as done/active
}
