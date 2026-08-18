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

import { TasksService } from './tasks.service';
import { TaskDocument } from './models/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ReorderTasksDto } from './dto/reorder-tasks.dto';
import { MoveTaskDto } from './dto/move-task.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { FindTasksDto } from './dto/find-tasks.dto';
import { CurrentUserId } from '../../../shared/telegram-user.decorator';

/**
 * The user id always comes from verified Telegram initData, never from the
 * request payload, so a client cannot address another user's tasks.
 */
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async findAll(
    @CurrentUserId() userId: number,
    @Query() query: FindTasksDto,
  ): Promise<TaskDocument[]> {
    return this.tasksService.findAllByUserIdAndDate(userId, query.date);
  }

  @Post('add')
  async add(
    @CurrentUserId() userId: number,
    @Body() dto: CreateTaskDto,
  ): Promise<void> {
    await this.tasksService.create(userId, dto);
  }

  // Static segments must be declared before ':id' so they are not captured by it.
  @Patch('reorder')
  async reorder(
    @CurrentUserId() userId: number,
    @Body() dto: ReorderTasksDto,
  ): Promise<void> {
    await this.tasksService.reorder(userId, dto.tasks);
  }

  @Patch('status/:id')
  async setStatus(
    @CurrentUserId() userId: number,
    @Param('id') id: string,
    @Body() dto: UpdateStatusDto,
  ): Promise<void> {
    await this.tasksService.setStatus(id, userId, dto.status);
  }

  @Patch('move/:id')
  async move(
    @CurrentUserId() userId: number,
    @Param('id') id: string,
    @Body() dto: MoveTaskDto,
  ): Promise<void> {
    await this.tasksService.move(id, userId, dto.date);
  }

  @Patch(':id')
  async rename(
    @CurrentUserId() userId: number,
    @Param('id') id: string,
    @Body() dto: UpdateTaskDto,
  ): Promise<void> {
    await this.tasksService.rename(id, userId, dto.text);
  }

  @Delete(':id')
  async remove(
    @CurrentUserId() userId: number,
    @Param('id') id: string,
  ): Promise<void> {
    await this.tasksService.remove(id, userId);
  }
}
