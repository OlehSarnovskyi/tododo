import "./todo-list.css";
import CreateNew from "./components/CreateNew";
import Task from './components/Task/Task';
import {useState} from "react";
import {List} from "@mui/material";
import {addNewTask, getTasksByUserIdAndDate} from "../../services/tasks.service";
import {useApiWithSnackbar} from "../../services/api.service";
import dayjs from "dayjs";

function TodoList({date, tasks, setTasksByUserIdAndDate}) {
    const api = useApiWithSnackbar()
    const [isAddingNewTask, setIsAddingNewTask] = useState(false)
    // TODO: need to refactor
    let tasksTemplates = tasks?.map(task => <Task key={task._id} task={task} date={date} setTasksByUserIdAndDate={setTasksByUserIdAndDate}/>)

    function addTask(text: string): void {
        addNewTask(api)({date: date.format('DD.MM.YYYY'), text}).then(() => {
            getTasksByUserIdAndDate(api)(date.format('DD.MM.YYYY')).then(tasks => {
                setTasksByUserIdAndDate(tasks)
            })
        })
    }
    
    function isToday(): boolean {
        return dayjs(date).isSame(dayjs(), 'day');
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
            <div className="todo-list-tasks">
                {tasks.length
                    ? <List sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
                        {tasksTemplates}
                    </List>
                    : <p className="todo-list-no-tasks">No tasks for {isToday() ? 'today' : 'this day'}</p>}
            </div>
        </div>
    )
}

export default TodoList
