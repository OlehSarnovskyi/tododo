import {Button, TextField} from "@mui/material";

function CreateNew({instance, setIsAddingNew, isAddingNew, addNew}) {

    function startAddingNewGroup(): void {
        setIsAddingNew(true)
    }

    function addNewByEnter(e: React.KeyboardEvent<HTMLDivElement>): void {
        if (e.key === 'Enter' || e.key === 'Escape') {
            setIsAddingNew(false)
        }
        if (e.key === 'Enter') {
            addNew((e.nativeEvent.target as any).value)
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
