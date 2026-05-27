import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';
import { TaskDocument } from './models/task.schema';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ReorderTasksDto } from './dto/reorder-tasks.dto';

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

  @Patch('reorder')
  async reorder(@Body() body: ReorderTasksDto): Promise<void> {
    await this.tasksService.reorder(body.tasks);
  }

  @Patch('markAs/:id')
  async markAs(
    @Param('id') id: string,
    @Body('userId') userId: number,
  ) {
    await this.tasksService.markAs(id, +userId);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body('userId') userId: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    await this.tasksService.update(id, +userId, updateTaskDto);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Query('userId') userId: number,
  ) {
    await this.tasksService.remove(id, +userId);
  }
}
