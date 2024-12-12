import CreateNew from "./components/CreateNew";
import Task from './components/Task/Task';
import {useState} from "react";
import {List} from "@mui/material";
import {addNewTask, getTasksByUserIdAndDate} from "../../services/tasks.service";

function TodoList({date, tasks, setTasksByUserIdAndDate}) {
    const [isAddingNewTask, setIsAddingNewTask] = useState(false)
    // TODO: need to refactor
    let tasksTemplates = tasks?.map(task => <Task key={task._id} task={task} date={date} setTasksByUserIdAndDate={setTasksByUserIdAndDate}/>)

    function addTask(text: string): void {
        addNewTask({date, text}).then(() => {
            getTasksByUserIdAndDate(date).then(tasks => {
                setTasksByUserIdAndDate(tasks)
            })
        })
    }

    return (
        <div className="todo-list">
            <CreateNew
                instance="Task"
                setIsAddingNew={setIsAddingNewTask}
                isAddingNew={isAddingNewTask}
                addNew={addTask}
            />
            <hr/>
            {tasks.length
            ? <List sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
                {tasksTemplates}
              </List>
            : 'No tasks for today'}
        </div>
    )
}

export default TodoList
