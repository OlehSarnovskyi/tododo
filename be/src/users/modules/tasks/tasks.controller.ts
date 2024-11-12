import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';
import { TaskDocument } from './models/task.schema';
import {UpdateTaskDto} from "./dto/update-task.dto";

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

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    this.tasksService.update(id, updateTaskDto)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    this.tasksService.remove(id)
  }

  // mask as done/active
}
