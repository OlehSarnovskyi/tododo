import './TodoList.css';
import CreateNewGroup from "./components/CreateNewGroup";
import Group from "./components/Group/Group";

function TodoList() {
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
            }
        ]
    }].map(group =>
        <Group key={group.id} group={group}/>
    )

    return (
        <div className="todo-list">
            <CreateNewGroup/>
            {list}
        </div>
    )
}

export default TodoList
