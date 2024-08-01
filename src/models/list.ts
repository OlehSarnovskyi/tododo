import {ID} from "../components/TodoList/models/id"

export namespace List {
    export interface Item {
        date: Date
        groups: Group[]
    }

    export interface Group {
        id: ID
        name: string
        tasks: Task[]
    }

    export interface Task {
        id: ID
        text: string
        status: StatusEnum
    }

    export enum StatusEnum {
        ACTIVE,
        DONE
    }
}