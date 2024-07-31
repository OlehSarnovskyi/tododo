import './TodoList.css';
import CreateNew from "./components/CreateNew";
import Group from "./components/Group/Group";
import {useState} from "react";

// [{
//     id: 'groupId',
//     name: 'groupName',
//     status: 'done',
//     tasks: [
//         {
//             id: 'taskId',
//             text: 'taskText',
//             status: 'done',
//             subtasks: [
//                 {
//                     id: 'subtaskId',
//                     text: 'subtaskText',
//                     status: 'done',
//                 }
//             ]
//         },
//         {
//             id: 'taskId2',
//             text: 'taskText 2',
//             status: 'done',
//             subtasks: []
//         }
//     ]
// }]

function TodoList() {
    const [isAddingNewGroup, setIsAddingNewGroup] = useState(false)

    const list = (JSON.parse(localStorage.getItem('tododoList')) || []).map(group => // TODO: create seperate functions to get and set form LS
        <Group key={group.id} group={group}/>
    )

    function addNewGroup(name): void {
        let list = JSON.parse(localStorage.getItem('tododoList')) || [] // TODO: create interface
        list.push({id: 'groupId', name, tasks: []}) // TODO: generate ID
        localStorage.setItem('tododoList', JSON.stringify(list))
    }

    return (
        <div className="todo-list">
            <CreateNew
                instance="Group"
                setIsAddingNew={setIsAddingNewGroup}
                isAddingNew={isAddingNewGroup}
                addNew={addNewGroup}
            />
            {list}
        </div>
    )
}

export default TodoList
