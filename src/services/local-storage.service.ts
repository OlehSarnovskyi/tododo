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

export function getTododoList(): List.Item[] {
    return LIST
}

export function updateTododoList(date: string, groups: List.Group[] = []): void {
    let list = [...LIST]
    let listByDate = list?.find(list => list.date === date) || {date, groups: []}
    // set new groups by date
    listByDate = {
        ...listByDate,
        groups
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