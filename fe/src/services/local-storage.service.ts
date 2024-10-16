import {List} from "../models/list";

let LIST: List.Item[] = [
    {
        date: '16.10.2024',
        tasks: [
            {
                _id: 'asdasdasdasdasd',
                text: 'too long task string task stringtask stringtask stringtask stringtask stringtask stringtask stringtask stringtask stringtask stringtask stringtask stringtask stringtask stringtask stringtask stringtask string',
                status: List.StatusEnum.ACTIVE
            }
        ]
    },
    {
        date: '16.10.2024',
        tasks: [
            {
                _id: 'asdasdasdasdasd',
                text: 'task string',
                status: List.StatusEnum.ACTIVE
            }
        ]
    }
]

export function getList(): List.Item[] {
    return LIST
}

export function updateTododoList(date: string, tasks: List.Item[] = []): void {
    let list = [...LIST]
    let listByDate = list?.find(list => list.date === date) || {date, tasks: []}
    // set new tasks by date
    listByDate = {
        ...listByDate,
        tasks
    }
    // remove previous
    list.filter(list => list.date !== date)
    // add updated
    list = [
        ...list,
        listByDate
    ]
    // set
    LIST = list
}