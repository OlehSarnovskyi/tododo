import Task from "./components/Task";
import CreateNew from "../CreateNew";
import {useState} from "react";

function Group({group}) {
    const [isAddingNewTask, setIsAddingNewTask] = useState(false)

    const tasks = group.tasks.map(task =>
        <Task key={task.id} task={task} groupId={group.id}/>
    )

    function addNewTask(text: string): void {}

    function deleteGroup(): void {}

    return <>
        <h3>{group.name} <button onClick={deleteGroup}>X</button></h3>
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
