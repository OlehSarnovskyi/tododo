import CreateNew from "./components/CreateNew";
import Task from './components/Task/Task';
import {useState} from "react";
import {List} from "@mui/material";

function TodoList({date, tasks}) {
    const [isAddingNewTask, setIsAddingNewTask] = useState(false)

    let tasksTemplates = tasks?.map(task => <Task key={task._id} task={task}/>)

    function addNewTask(text: string): void {}

    return (
        <div className="todo-list">
            <CreateNew
                instance="Task"
                setIsAddingNew={setIsAddingNewTask}
                isAddingNew={isAddingNewTask}
                addNew={addNewTask}
            />
            <hr/>
            <List sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
                {tasksTemplates}
            </List>
        </div>
    )
}

export default TodoList
