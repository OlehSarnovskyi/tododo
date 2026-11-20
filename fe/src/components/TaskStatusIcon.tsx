import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { TaskStatus } from "../models/status";

interface Props {
  status: TaskStatus;
  fontSize?: "small" | "medium";
}

/** Empty circle → half-filled → check, shared by every list that shows a task. */
function TaskStatusIcon({ status, fontSize = "medium" }: Props) {
  if (status === TaskStatus.DONE) {
    return <CheckCircleIcon color="primary" fontSize={fontSize} />;
  }

  if (status === TaskStatus.IN_PROGRESS) {
    return <TimelapseIcon color="primary" fontSize={fontSize} />;
  }

  return <RadioButtonUncheckedIcon sx={{ color: "text.disabled" }} fontSize={fontSize} />;
}

export default TaskStatusIcon;
