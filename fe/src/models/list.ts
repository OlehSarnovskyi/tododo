import {ID} from "../components/TodoList/models/id"

export namespace List {
    export interface Task {
        _id: ID
        userId: number
        text: string
        status: StatusEnum
        date: string
    }

    export enum StatusEnum {
        ACTIVE,
        DONE
    }
}