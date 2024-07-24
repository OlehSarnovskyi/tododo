import {Button, TextField} from "@mui/material";
import {useState} from "react";

function CreateNewGroup() {
    const [isAddingNewGroup, setIsAddingNewGroup] = useState(false)

    function startAddingNewGroup() {
        setIsAddingNewGroup(true)
    }

    function addNewGroup(e) {
        if (e.key === 'Enter' || e.key === 'Escape') {
            setIsAddingNewGroup(false)
            // list.push({
            //     id: 'id2', // TODO: generate ID
            //     name: 'name2',
            //     tasks: []
            // }) // TODO: do it with props and internal func
        }
    }

    return (
        <>
            {!isAddingNewGroup ? (
                <Button variant="outlined" onClick={startAddingNewGroup}>+ New group</Button>
            ) : (
                <TextField id="outlined-basic" label="New group" variant="outlined" onKeyDown={addNewGroup} />
            )}
        </>
    )
}

export default CreateNewGroup
