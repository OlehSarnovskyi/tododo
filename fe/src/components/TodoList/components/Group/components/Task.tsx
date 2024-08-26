import './Task.css'

function Task({task, groupId}) {

    function deleteTask(): void {}

    return <p className="task">
        {task.text}
    </p>
}

export default Task
