import {Injectable} from '@nestjs/common'

import {TasksRepository} from "./tasks.repository";

@Injectable()
export class TasksService {
    constructor(private readonly tasksRepository: TasksRepository) {}

    // check controller
}
