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

const OPTIONS = [
    'Edit',
    'Delete'
];

const ITEM_HEIGHT = 48;

function Task({task, date, setTasksByUserIdAndDate}) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [isEditMode, setEditMode] = useState<boolean>(false)
    const open = Boolean(!!anchorEl)
    const handleClick = (event: MouseEvent) => {
        setAnchorEl((event as any).currentTarget)
    };

    function handleClose(option: 'Edit' | 'Delete'): void {
        if (option === 'Delete') {
            deleteT()
        } else if (option === 'Edit') {
            setEditMode(true)
        }
        setAnchorEl(null)
    }

    function deleteT(): void {
        deleteTask(task._id).then(() => {
            getTasksByUserIdAndDate(date).then(tasks => {
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
            editTask({_id: task._id, text: (e.target as any).value}).then(() => {
                getTasksByUserIdAndDate(date).then(tasks => {
                    setTasksByUserIdAndDate(tasks)
                })
            })
        }
    }

    function markAs(): void {
        markAsTask(task._id).then(() => {
            setTimeout(() => {
                getTasksByUserIdAndDate(date).then(tasks => {
                    setTasksByUserIdAndDate(tasks)
                })
            })
        })
    }

    return (
        isEditMode
        ? <TextField variant="outlined" defaultValue={task.text} onKeyDown={(e) => editByEnter(e)} />
        : <ListItem
            key={task._id}
            onClick={markAs}
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
                        onClose={handleClose}
                        slotProps={{
                            paper: {
                                style: {
                                    maxHeight: ITEM_HEIGHT * 4.5,
                                    width: '20ch',
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
