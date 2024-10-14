import './TodoList.css';
import CreateNew from "./components/CreateNew";
import Task from './components/Task/Task';
import {useState} from "react";
import {generateID} from "./services/helper.service";
import {updateTododoList} from "../../services/local-storage.service";
import { List } from '../../models/list';

function TodoList({date, list}) {
    const [isAddingNewTask, setIsAddingNewTask] = useState(false)

    let tasksTemplates = list?.tasks?.map(task => <Task key={task.id} task={task}/>)

    function addNewTask(text: string): void {
        list?.tasks?.push({id: generateID(), text, status: List.StatusEnum.ACTIVE})
        updateTododoList(date, list?.tasks)
    }

    return (
        <div className="todo-list">
            <CreateNew
                instance="Task"
                setIsAddingNew={setIsAddingNewTask}
                isAddingNew={isAddingNewTask}
                addNew={addNewTask}
            />
            <hr/>
            {tasksTemplates}
        </div>
    )
}

export default TodoList
