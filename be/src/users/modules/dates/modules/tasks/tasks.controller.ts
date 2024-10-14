import {Body, Controller, Post} from '@nestjs/common'
import {CreateTaskDto} from "./dto/create-task.dto";
import {TasksService} from "./tasks.service";

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Post('add')
    async addTask(@Body() taskDto: CreateTaskDto): Promise<void> {
        // return await this.tasksService
    }

    // delete

    // edit

    // mask as done/active
}
