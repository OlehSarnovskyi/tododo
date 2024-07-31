import './TodoList.css';
import CreateNew from "./components/CreateNew";
import Group from "./components/Group/Group";
import {useState} from "react";

function TodoList() {
    const [isAddingNewGroup, setIsAddingNewGroup] = useState(false)

    const list = [{
        id: 'groupId',
        name: 'groupName',
        status: 'done',
        tasks: [
            {
                id: 'taskId',
                text: 'taskText',
                status: 'done',
                subtasks: [
                    {
                        id: 'subtaskId',
                        text: 'subtaskText',
                        status: 'done',
                    }
                ]
            },
            {
                id: 'taskId2',
                text: 'taskText 2',
                status: 'done',
                subtasks: []
            }
        ]
    }].map(group =>
        <Group key={group.id} group={group}/>
    )

    return (
        <div className="todo-list">
            <CreateNew
                instance="Group"
                setIsAddingNew={setIsAddingNewGroup}
                isAddingNew={isAddingNewGroup}
            />
            {list}
        </div>
    )
}

export default TodoList
