import Task from "./components/Task";
import CreateNew from "../CreateNew";
import {useState} from "react";

function Group({group}) {
    const [isAddingNewTask, setIsAddingNewTask] = useState(false)

    const tasks = group.tasks.map(task =>
        <Task key={task.id} task={task}/>
    )

    function addNewTask(text: string): void {
        let list = JSON.parse(localStorage.getItem('tododoList')) || []
        let g = list.find(g => group.id === g.id)
        g.tasks.push({id: 'taskID', text, subtasks: []})
        localStorage.setItem('tododoList', JSON.stringify(list))
    }

    return <>
        <h3>
            {group.name}
        </h3>
        <CreateNew
            instance="Task"
            setIsAddingNew={setIsAddingNewTask}
            isAddingNew={isAddingNewTask}
            addNew={addNewTask}
        />
        {tasks}
    </>
}

export default Group
