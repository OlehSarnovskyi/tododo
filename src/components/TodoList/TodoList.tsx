import './TodoList.css';
import CreateNew from "./components/CreateNew";
import Group from "./components/Group/Group";
import {useState} from "react";
import {generateID} from "./services/helper.service";
import {getTododoList} from "./services/local-storage.service";

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

    const groups = getTododoList().map(group => <Group key={group.id} group={group}/>)

    function addNewGroup(name: string): void {
        let list = getTododoList() // TODO: create interface
        list.push({id: generateID(), name, tasks: []})
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
            {groups}
        </div>
    )
}

export default TodoList
