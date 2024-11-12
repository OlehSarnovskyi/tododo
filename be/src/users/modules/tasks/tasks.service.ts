import {Injectable} from '@nestjs/common'

import {TasksRepository} from "./tasks.repository";
import {CreateTaskDto} from "./dto/create-task.dto";
import {TaskDocument} from "./models/task.schema";
import {UpdateTaskDto} from "./dto/update-task.dto";

@Injectable()
export class TasksService {
    constructor(private readonly tasksRepository: TasksRepository) {}

    async findAllByUserIdAndDate(query: { userId: number, date: string }): Promise<TaskDocument[]> {
        return await this.tasksRepository.findAllByUserIdAndDate(query)
    }

    async create(createTaskDto: CreateTaskDto) {
        return await this.tasksRepository.create(createTaskDto)
    }

    update(_id: string, updatePostDto: UpdateTaskDto) {
        return this.tasksRepository.findOneAndUpdate({_id}, {$set: updatePostDto})
    }

    remove(_id: string) {
        return this.tasksRepository.findOneAndDelete({_id})
    }

    markAs(_id: string) {
        this.tasksRepository.findOneAndMarkAs({_id})
    }
}
