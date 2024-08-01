import Task from "./components/Task";
import CreateNew from "../CreateNew";
import {useState} from "react";
import {generateID} from "../../services/helper.service";
import {getTododoList} from "../../services/local-storage.service";
import {List} from "../../models/list";
import StatusEnum = List.StatusEnum;

function Group({group}) {
    const [isAddingNewTask, setIsAddingNewTask] = useState(false)

    const tasks = group.tasks.map(task =>
        <Task key={task.id} task={task} groupId={group.id}/>
    )

    function addNewTask(text: string): void {
        let list = getTododoList()
        let g = list.find(g => group.id === g.id)
        g?.tasks.push({id: generateID(), text, status: StatusEnum.ACTIVE})
        localStorage.setItem('tododoList', JSON.stringify(list))
    }

    function deleteGroup(): void {
        let list = getTododoList()
        list = list.filter(g => g.id !== group.id)
        localStorage.setItem('tododoList', JSON.stringify(list))
    }

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
