import './TodoList.css';
import CreateNew from "./components/CreateNew";
import Group from "./components/Group/Group";
import {useState} from "react";
import {generateID} from "./services/helper.service";
import {updateTododoList} from "../../services/local-storage.service";

function TodoList({date, list}) {
    const [isAddingNewGroup, setIsAddingNewGroup] = useState(false)

    let groupsTemplates = list?.groups?.map(group => <Group key={group.id} group={group}/>)

    function addNewGroup(name: string): void {
        list?.groups?.push({id: generateID(), name, tasks: []})
        updateTododoList(date, list?.groups)
    }

    return (
        <div className="todo-list">
            <CreateNew
                instance="Group"
                setIsAddingNew={setIsAddingNewGroup}
                isAddingNew={isAddingNewGroup}
                addNew={addNewGroup}
            />
            {groupsTemplates}
        </div>
    )
}

export default TodoList
