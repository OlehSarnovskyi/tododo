import {Button, TextField} from "@mui/material";

function CreateNew({instance, setIsAddingNew, isAddingNew, addNew}) {

    function startAddingNewInstance(): void {
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
                <Button sx={{width: '100%'}} variant="outlined" onClick={startAddingNewInstance}>+ New {instance}</Button>
            ) : (
                <TextField id="outlined-basic" label={"New" + instance} variant="outlined" onKeyDown={(e) => addNewByEnter(e)} />
            )}
        </>
    )
}

export default CreateNew
