import "./Task.css";
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
  TextField
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { useRef, useState } from "react";
import { deleteTask, editTask, getTasksByUserIdAndDate, markAsTask, moveTask } from "../../../../services/tasks.service";
import { useApiWithSnackbar } from "../../../../services/api.service";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type TaskOption = "edit" | "delete" | "tomorrow";

const OPTIONS: { title: string; value: TaskOption }[] = [
  { title: "Edit", value: "edit" },
  { title: "Tomorrow", value: "tomorrow" },
  { title: "Delete", value: "delete" },
];

const ITEM_HEIGHT = 48;

function Task({ task, date, setTasksByUserIdAndDate }) {
  const api = useApiWithSnackbar();
  const isSubmitting = useRef(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isEditMode, setEditMode] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>(task.text);
  const open = Boolean(anchorEl);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  function handleClose(option: TaskOption): void {
    setAnchorEl(null);
    if (option === "delete") {
      deleteT();
    } else if (option === "edit") {
      setEditMode(true);
    } else if (option === "tomorrow") {
      moveToTomorrow();
    }
  }

  function closeMenu(e: React.SyntheticEvent): void {
    e.stopPropagation();
    setAnchorEl(null);
  }

  function closeMenuAndEditMode(): void {
    setAnchorEl(null);
    setEditMode(false);
  }

  async function deleteT(): Promise<void> {
    if (isSubmitting.current) return;
    isSubmitting.current = true;
    try {
      await deleteTask(api)(task._id);
      const tasks = await getTasksByUserIdAndDate(api)(date.format("DD.MM.YYYY"));
      setTasksByUserIdAndDate(tasks);
    } finally {
      isSubmitting.current = false;
    }
  }

  function editByEnter(e: React.KeyboardEvent<HTMLDivElement>): void {
    const currentText = (e.target as HTMLInputElement).value;
    setInputText(currentText);
    if (e.key === "Enter" && currentText.trim().length) {
      edit(currentText);
    }
  }

  async function edit(text: string): Promise<void> {
    if (isSubmitting.current) return;
    isSubmitting.current = true;
    try {
      await editTask(api)({ _id: task._id, text });
      const tasks = await getTasksByUserIdAndDate(api)(date.format("DD.MM.YYYY"));
      setTasksByUserIdAndDate(tasks);
      closeMenuAndEditMode();
    } finally {
      isSubmitting.current = false;
    }
  }

  async function markAs(): Promise<void> {
    if (isSubmitting.current) return;
    isSubmitting.current = true;
    try {
      await markAsTask(api)(task._id);
      const tasks = await getTasksByUserIdAndDate(api)(date.format("DD.MM.YYYY"));
      setTasksByUserIdAndDate(tasks);
    } finally {
      isSubmitting.current = false;
    }
  }

  async function moveToTomorrow(): Promise<void> {
    if (isSubmitting.current) return;
    isSubmitting.current = true;
    try {
      const nextDate = date.add(1, "day").format("DD.MM.YYYY");
      await moveTask(api)(task._id, nextDate);
      const tasks = await getTasksByUserIdAndDate(api)(date.format("DD.MM.YYYY"));
      setTasksByUserIdAndDate(tasks);
    } finally {
      isSubmitting.current = false;
    }
  }

  return (
    <div ref={setNodeRef} style={style}>
      {isEditMode
        ? <TextField
          autoFocus
          sx={{ width: "100%" }}
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
                  {inputText.trim().length ? <DoneIcon /> : <CloseIcon />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        : <ListItem
          key={task._id}
          secondaryAction={
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? "long-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon />
              <Menu
                id="long-menu"
                MenuListProps={{ "aria-labelledby": "long-button" }}
                anchorEl={anchorEl}
                open={open}
                onClose={closeMenu}
                anchorOrigin={{ vertical: "top", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                slotProps={{
                  paper: {
                    style: { maxHeight: ITEM_HEIGHT * 4.5, width: "12ch" }
                  }
                }}
              >
                {OPTIONS.map((option) => (
                  <MenuItem
                    key={option.value}
                    onClick={() => handleClose(option.value)}
                    sx={{ fontSize: "14px" }}
                  >
                    <ListItemIcon>
                      {option.value === "edit" && <EditIcon fontSize="small" />}
                      {option.value === "tomorrow" && <ArrowForwardIcon fontSize="small" />}
                      {option.value === "delete" && <DeleteIcon fontSize="small" />}
                    </ListItemIcon>
                    {option.title}
                  </MenuItem>
                ))}
              </Menu>
            </IconButton>
          }
          disablePadding
        >
          <IconButton
            {...attributes}
            {...listeners}
            size="small"
            sx={{ cursor: "grab", color: "text.disabled", ml: 0.5, touchAction: "none" }}
            aria-label="drag to reorder"
          >
            <DragIndicatorIcon fontSize="small" />
          </IconButton>
          <ListItemButton dense>
            <ListItemIcon className="task__item-icon">
              <Checkbox
                edge="start"
                disableRipple
                checked={task.status}
                onClick={markAs}
              />
            </ListItemIcon>
            <ListItemText className="task__item-text" primary={task.text} />
          </ListItemButton>
        </ListItem>
      }
    </div>
  );
}

export default Task;
