import {List} from "../models/list";

let LIST: List.Item[] = [
    {
        date: '12.08.2024',
        groups: [
            {
                id: 'asd',
                name: 'g1',
                tasks: [
                    {
                        id: 'asdasdasdasdasd',
                        text: 'too long task string task stringtask stringtask stringtask stringtask stringtask stringtask stringtask stringtask stringtask stringtask stringtask stringtask stringtask stringtask stringtask stringtask string',
                        status: List.StatusEnum.ACTIVE
                    }
                ]
            }
        ]
    },
    {
        date: '13.08.2024',
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

export function getList(): List.Item[] {
    console.log('getList');
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