import Task from "./components/Task";
import CreateNew from "../CreateNew";
import {useState} from "react";

function Group({group}) {
    const [isAddingNewTask, setIsAddingNewTask] = useState(false)

    const tasks = group.tasks.map(task =>
        <Task key={task.id} task={task}/>
    )

    return <>
        <h3>
            {group.name}
        </h3>
        <CreateNew
            instance="Task"
            setIsAddingNew={setIsAddingNewTask}
            isAddingNew={isAddingNewTask}
        />
        {tasks}
    </>
}

export default Group
