import './TodoList.css';
import CreateNewGroup from "./components/CreateNewGroup";

// from localStorage
const list = [
    {
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
            }
        ]
    }
]

function TodoList() {
    return (
        <div className="TodoList">
            <CreateNewGroup/>
        </div>
    )
}

export default TodoList
