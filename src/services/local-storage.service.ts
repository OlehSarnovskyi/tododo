import {List} from "../models/list";

let LIST: List.Item[] = [
    {
        date: '04.08.2024',
        groups: [
            {
                id: 'asd',
                name: 'g1',
                tasks: []
            }
        ]
    },
    {
        date: '05.08.2024',
        groups: [
            {
                id: 'asd123',
                name: 'g1',
                tasks: [
                    {
                        id: 'asdasdasdasdasd',
                        text: 'task string',
                        status: List.StatusEnum.ACTIVE
                    }
                ]
            }
        ]
    }
]

export function getTododoList(): List.Group[] {
    return JSON.parse(localStorage.getItem('tododoList')) || []
}