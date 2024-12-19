import './Task.css'
import {
    Checkbox,
    IconButton,
    InputAdornment,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    TextField,
} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {useState} from "react";
import {deleteTask, editTask, getTasksByUserIdAndDate, markAsTask} from "../../../../services/tasks.service";
import {useApiWithSnackbar} from "../../../../services/api.service";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

const OPTIONS = [
    'Edit',
    'Delete',
    'Copy text'
];

const ITEM_HEIGHT = 48;

function Task({task, date, setTasksByUserIdAndDate}) {
    const api = useApiWithSnackbar()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [isEditMode, setEditMode] = useState<boolean>(false)
    const [inputText, setInputText] = useState<string>(task.text)
    const open = Boolean(anchorEl!)
    const handleClick = (event: MouseEvent) => {
        setAnchorEl((event as any).currentTarget)
    };

    function handleClose(option: 'Edit' | 'Delete'): void {
        setAnchorEl(null)
        if (option === 'Delete') {
            deleteT()
        } else if (option === 'Edit') {
            setEditMode(true)
        } else if (option === 'Copy text') {
            copyText()
        }
    }

    function closeMenu(e: Event): void {
        e.stopPropagation()
        setAnchorEl(null)
    }

    function closeMenuAndEditMode(): void {
        setAnchorEl(null)
        setEditMode(false)
    }

    function copyText(): void {
        navigator.clipboard.writeText(task.text)
    }

    function deleteT(): void {
        deleteTask(api)(task._id).then(() => {
            getTasksByUserIdAndDate(api)(date.format('DD.MM.YYYY')).then(tasks => {
                setTasksByUserIdAndDate(tasks)
            })
        })
    }

    function editByEnter(e: React.KeyboardEvent<HTMLDivElement>): void {
        setInputText((e.target as any).value)
        // TODO: || e.key === 'Escape' only for PC
        // if (e.key === 'Enter') {
        //   closeMenuAndEditMode()
        // }
        if (e.key === 'Enter' && inputText.trim().length) {
            closeMenuAndEditMode()
            editTask(api)({_id: task._id, text: inputText}).then(() => {
                getTasksByUserIdAndDate(api)(date.format('DD.MM.YYYY')).then(tasks => {
                    setTasksByUserIdAndDate(tasks)
                })
            })
        }
    }

    function edit(text: string): void {
        closeMenuAndEditMode()
        editTask(api)({_id: task._id, text}).then(() => {
            getTasksByUserIdAndDate(api)(date.format('DD.MM.YYYY')).then(tasks => {
                setTasksByUserIdAndDate(tasks)
            })
        })
    }

    async function markAs(): Promise<void> {
        await markAsTask(api)(task._id)
        const tasks = await getTasksByUserIdAndDate(api)(date.format('DD.MM.YYYY'))
        setTasksByUserIdAndDate(tasks)
    }

    return (
        isEditMode
        ? <TextField
                autoFocus
                sx={{width: '100%'}}
                variant="outlined"
                defaultValue={task.text}
                onKeyUp={(e) => editByEnter(e)}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={inputText.trim().length
                                ? () => edit(inputText)
                                : closeMenuAndEditMode
                            }>
                                {inputText.trim().length
                                ? <DoneIcon/>
                                : <CloseIcon/>}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        : <ListItem
            key={task._id}
            secondaryAction={
                <IconButton aria-label="more"
                            id="long-button"
                            aria-controls={open ? 'long-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={handleClick}
                >
                    <MoreVertIcon/>

                    <Menu
                        id="long-menu"
                        MenuListProps={{
                            'aria-labelledby': 'long-button',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={closeMenu}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        slotProps={{
                            paper: {
                                style: {
                                    maxHeight: ITEM_HEIGHT * 4.5,
                                    width: '10ch',
                                },
                            },
                        }}
                    >
                        {OPTIONS.map((option) => (
                            <MenuItem key={option} onClick={() => handleClose(option)}>
                                {option}
                            </MenuItem>
                        ))}
                    </Menu>
                </IconButton>
            }
            disablePadding
        >
            <ListItemButton dense>
                <ListItemIcon className="task__item-icon">
                    <Checkbox
                        edge="start"
                        disableRipple
                        checked={task.status}
                        onClick={markAs}
                    />
                </ListItemIcon>
                <ListItemText primary={task.text}/>
            </ListItemButton>
        </ListItem>
    )
}

export default Task
