import {Module} from '@nestjs/common';
import {DatabaseModule} from "../../../shared/database.module";
import {TaskDocument, TaskSchema} from "./models/task.schema";
import {TasksController} from "./tasks.controller";
import {TasksService} from "./tasks.service";
import {TasksRepository} from "./tasks.repository";

@Module({
  imports: [
    DatabaseModule.forFeature([{name: TaskDocument.name, schema: TaskSchema}]),
  ],
  controllers: [TasksController],
  providers: [TasksService, TasksRepository],
  exports: [TasksService]
})
export class TasksModule {}
