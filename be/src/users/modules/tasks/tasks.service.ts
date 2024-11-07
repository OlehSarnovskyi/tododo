import {Injectable} from '@nestjs/common'

import {TasksRepository} from "./tasks.repository";
import {CreateTaskDto} from "./dto/create-task.dto";
import {TaskDocument} from "./models/task.schema";

@Injectable()
export class TasksService {
    constructor(private readonly tasksRepository: TasksRepository) {}

    async findAllByUserIdAndDate(query: { userId: number, date: string }): Promise<TaskDocument[]> {
        return await this.tasksRepository.findAllByUserIdAndDate(query)
    }

    async create(createTaskDto: CreateTaskDto) {
        return await this.tasksRepository.create(createTaskDto)
    }
}
