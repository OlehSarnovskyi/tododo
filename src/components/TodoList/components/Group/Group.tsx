import Task from "./components/Task";

function Group({group}) {
    const tasks = group.tasks.map(task =>
        <Task key={task.id} task={task}/>
    )

    return <>
        <h3>
            {group.name}
        </h3>
        {tasks}
    </>
}

export default Group
