import "./Task.css";
import {
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
import { useState } from "react";
import { Dayjs } from "dayjs";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { useApiWithSnackbar } from "../../../../services/api.service";
import { List } from "../../../../models/list";
import { TaskStatus } from "../../../../models/status";
import { useTaskActions } from "./useTaskActions";

type TaskOption = "edit" | "tomorrow" | "delete";

const OPTIONS: { title: string; value: TaskOption; icon: JSX.Element }[] = [
  { title: "Edit", value: "edit", icon: <EditIcon fontSize="small" /> },
  { title: "Tomorrow", value: "tomorrow", icon: <ArrowForwardIcon fontSize="small" /> },
  { title: "Delete", value: "delete", icon: <DeleteIcon fontSize="small" /> },
];

const STATUS_ICON: Record<TaskStatus, JSX.Element> = {
  [TaskStatus.TODO]: <RadioButtonUncheckedIcon sx={{ color: "text.disabled" }} />,
  [TaskStatus.IN_PROGRESS]: <TimelapseIcon color="primary" />,
  [TaskStatus.DONE]: <CheckCircleIcon color="primary" />,
};

const MENU_MAX_HEIGHT = 48 * 4.5;

interface Props {
  task: List.Task;
  date: Dayjs;
  setTasksByUserIdAndDate: (update: (previous: List.Task[]) => List.Task[]) => void;
}

function Task({ task, date, setTasksByUserIdAndDate }: Props) {
  const api = useApiWithSnackbar();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isEditMode, setEditMode] = useState(false);
  const [inputText, setInputText] = useState(task.text);
  const isMenuOpen = Boolean(anchorEl);

  const actions = useTaskActions({ api, task, date, setTasks: setTasksByUserIdAndDate });

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: task._id });

  const isInProgress = task.status === TaskStatus.IN_PROGRESS;
  const isDone = task.status === TaskStatus.DONE;
  const hasText = inputText.trim().length > 0;

  function selectOption(option: TaskOption): void {
    setAnchorEl(null);

    if (option === "edit") setEditMode(true);
    if (option === "tomorrow") actions.moveToTomorrow();
    if (option === "delete") actions.remove();
  }

  async function rename(text: string): Promise<void> {
    if (await actions.rename(text)) {
      setEditMode(false);
    }
  }

  function renameByEnter(event: React.KeyboardEvent<HTMLDivElement>): void {
    const text = (event.target as HTMLInputElement).value;
    setInputText(text);

    if (event.key === "Enter" && text.trim().length) {
      rename(text);
    }
  }

  if (isEditMode) {
    return (
      <TextField
        autoFocus
        sx={{ width: "100%" }}
        variant="outlined"
        defaultValue={task.text}
        onKeyUp={renameByEnter}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label={hasText ? "save task" : "cancel editing"}
                onClick={() => (hasText ? rename(inputText) : setEditMode(false))}
              >
                {hasText ? <DoneIcon /> : <CloseIcon />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <ListItem
        sx={{
          borderLeft: "3px solid",
          borderLeftColor: isInProgress ? "primary.main" : "transparent",
          bgcolor: isInProgress ? "rgba(156, 107, 79, 0.08)" : "transparent",
          borderRadius: "8px",
          transition: "background-color .15s ease, border-color .15s ease",
        }}
        secondaryAction={
          <IconButton
            aria-label="task actions"
            aria-haspopup="true"
            aria-expanded={isMenuOpen ? "true" : undefined}
            onClick={(event) => setAnchorEl(event.currentTarget)}
          >
            <MoreVertIcon />
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

        <ListItemButton component="div" dense>
          <ListItemIcon className="task__item-icon">
            <IconButton
              edge="start"
              disableRipple
              onClick={actions.cycleStatus}
              aria-label="change status"
            >
              {STATUS_ICON[task.status] ?? STATUS_ICON[TaskStatus.TODO]}
            </IconButton>
          </ListItemIcon>
          <ListItemText
            className="task__item-text"
            primary={task.text}
            primaryTypographyProps={{
              sx: isDone
                ? { textDecoration: "line-through", color: "text.secondary" }
                : undefined,
            }}
          />
        </ListItemButton>
      </ListItem>

      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        slotProps={{ paper: { style: { maxHeight: MENU_MAX_HEIGHT, minWidth: 168 } } }}
      >
        {OPTIONS.map((option) => (
          <MenuItem
            key={option.value}
            onClick={() => selectOption(option.value)}
            sx={{ fontSize: "14px" }}
          >
            <ListItemIcon>{option.icon}</ListItemIcon>
            {option.title}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default Task;
