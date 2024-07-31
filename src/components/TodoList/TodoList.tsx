import './TodoList.css';
import CreateNew from "./components/CreateNew";
import Group from "./components/Group/Group";
import {useState} from "react";
import {generateID} from "./services/helper.service";
import {getTododoList} from "./services/local-storage.service";

function TodoList() {
    const [isAddingNewGroup, setIsAddingNewGroup] = useState(false)

    const groups = getTododoList().map(group => <Group key={group.id} group={group}/>)

    function addNewGroup(name: string): void {
        let list = getTododoList()
        list.push({id: generateID(), name, tasks: []})
        localStorage.setItem('tododoList', JSON.stringify(list))
    }

    return (
        <div className="todo-list">
            <CreateNew
                instance="Group"
                setIsAddingNew={setIsAddingNewGroup}
                isAddingNew={isAddingNewGroup}
                addNew={addNewGroup}
            />
            {groups}
        </div>
    )
}

export default TodoList
