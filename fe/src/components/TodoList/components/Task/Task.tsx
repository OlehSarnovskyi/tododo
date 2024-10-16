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
} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {useState} from "react";

const options = [
    'Edit',
    'Delete'
];

const ITEM_HEIGHT = 48;

function Task({task}) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(!!anchorEl)
    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    };
    const handleClose = () => {
        setAnchorEl(null)
    };

    function deleteTask(): void {}

    return (
        <ListItem
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
                        {options.map((option) => (
                            <MenuItem key={option} onClick={handleClose}>
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
                    />
                </ListItemIcon>
                <ListItemText
                    className="task"
                    primary={`Line item ${task.text}`}
                />
            </ListItemButton>
        </ListItem>
    )
}

export default Task
