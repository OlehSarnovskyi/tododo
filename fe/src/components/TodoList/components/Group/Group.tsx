import Task from "./components/Task";
import CreateNew from "../CreateNew";
import {useState} from "react";
import {generateID} from "../../services/helper.service";
import {List} from "../../../../models/list";

function Group({group}) {
    const [isAddingNewTask, setIsAddingNewTask] = useState(false)

    let gtasks = group.tasks;

    const tasks = group.tasks.map(task =>
        <Task key={task.id} task={task} groupId={group.id}/>
    )

    function addNewTask(text: string): void {
        gtasks.push({
            id: generateID(),
            text,
            status: List.StatusEnum.ACTIVE
        })
        // TODO: check useReducer
    }

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
        <hr/>
    </>
}

export default Group
