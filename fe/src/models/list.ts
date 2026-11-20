import {ID} from "../components/TodoList/models/id"
import {TaskStatus} from "./status"

export namespace List {
    export interface Task {
        _id: ID
        userId: number
        text: string
        status: TaskStatus
        date: string
    }

    /** Unfinished tasks outside today, as returned by GET /tasks/open. */
    export interface OpenTasks {
        skipped: Task[]
        upcoming: Task[]
        skippedTotal: number
        upcomingTotal: number
    }
}