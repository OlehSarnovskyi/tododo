import {getTododoList} from "../../../services/local-storage.service";

function Task({task, groupId}) {

    function deleteTask(): void {
        let list = getTododoList()
        const group = list.find(g => g.id === groupId)
        // const tasks = group?.tasks.filter(t => t.id !== task.id)
        localStorage.setItem('tododoList', JSON.stringify(list))
    } // TODO: fix this func

    return <p>
        {task.text}
    </p>
}

export default Task
