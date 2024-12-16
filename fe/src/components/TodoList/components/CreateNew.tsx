import {Button, IconButton, InputAdornment, TextField} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from "@mui/icons-material/Close";
import {useState} from "react";

function CreateNew({instance, setIsAddingNew, isAddingNew, addNew}) {
    const [inputText, setInputText] = useState<string>('')

    function startAddingNewInstance(): void {
        setIsAddingNew(true)
    }

    function addNewByEnter(e: React.KeyboardEvent<HTMLDivElement>): void {
        setInputText((e.target as any).value)
        // TODO: || e.key === 'Escape' only top PC
        if (e.key === 'Enter' && inputText.trim().length) {
            add(inputText)
        }
    }

    function add(text: string): void {
        addNew(text)
        setInputText('')
        setIsAddingNew(false)
    }

    return (
        <>
            {!isAddingNew ? (
                <Button sx={{width: '100%'}} variant="outlined" onClick={startAddingNewInstance}>+ New {instance}</Button>
            ) : (
                <TextField
                    autoFocus
                    sx={{width: '100%'}}
                    label={"New" + instance}
                    variant="outlined"
                    onKeyUp={(e) => addNewByEnter(e)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={inputText.trim().length
                                    ? () => add(inputText)
                                    : () => setIsAddingNew(false)
                                }>
                                    {inputText.trim().length
                                        ? <AddIcon/>
                                        : <CloseIcon/>}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            )}
        </>
    )
}

export default CreateNew
