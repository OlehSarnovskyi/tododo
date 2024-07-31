import {Button, TextField} from "@mui/material";

function CreateNew({instance, setIsAddingNew, isAddingNew, addNew}) {

    function startAddingNewGroup(): void {
        setIsAddingNew(true)
    }

    function addNewByEnter(e: React.KeyboardEvent<HTMLDivElement>): void {
        if (e.key === 'Enter' || e.key === 'Escape') {
            setIsAddingNew(false)
            // list.push({
            //     id: 'id2', // TODO: generate ID
            //     name: 'name2',
            //     tasks: []
            // }) // TODO: do it with props and internal func
        }
        if (e.key === 'Enter') {
            // addNew()
        }
    }

    return (
        <>
            {!isAddingNew ? (
                <Button variant="outlined" onClick={startAddingNewGroup}>+ New {instance}</Button>
            ) : (
                <TextField id="outlined-basic" label={"New" + instance} variant="outlined" onKeyDown={(e) => addNewByEnter(e)} />
            )}
        </>
    )
}

export default CreateNew
