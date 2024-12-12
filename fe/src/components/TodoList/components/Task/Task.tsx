import './Task.css'
import {
    Checkbox,
    IconButton,
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

const OPTIONS = [
    'Edit',
    'Delete'
];

const ITEM_HEIGHT = 48;

function Task({task, date, setTasksByUserIdAndDate}) {
    const api = useApiWithSnackbar()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [isEditMode, setEditMode] = useState<boolean>(false)
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
        }
    }

    function closeMenu(e: Event) {
        e.stopPropagation()
        setAnchorEl(null)
    }

    function deleteT(): void {
        deleteTask(api)(task._id).then(() => {
            getTasksByUserIdAndDate(api)(date).then(tasks => {
                setTasksByUserIdAndDate(tasks)
            })
        })
    }

    function editByEnter(e: React.KeyboardEvent<HTMLDivElement>): void {
        if (e.key === 'Enter' || e.key === 'Escape') {
            setEditMode(false)
            setAnchorEl(null)
        }
        if (e.key === 'Enter') {
            editTask(api)({_id: task._id, text: (e.target as any).value}).then(() => {
                getTasksByUserIdAndDate(api)(date).then(tasks => {
                    setTasksByUserIdAndDate(tasks)
                })
            })
        }
    }

    function markAs(): void {
        markAsTask(api)(task._id).then(() => {
            setTimeout(() => {
                getTasksByUserIdAndDate(api)(date).then(tasks => {
                    setTasksByUserIdAndDate(tasks)
                })
            }, 200)
        })
    }

    return (
        isEditMode
        ? <TextField variant="outlined" defaultValue={task.text} onKeyDown={(e) => editByEnter(e)} />
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
                <ListItemText
                    className="task"
                    primary={task.text}
                />
            </ListItemButton>
        </ListItem>
    )
}

export default Task
