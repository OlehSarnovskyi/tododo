import { Box, Typography } from "@mui/material";

import { List } from "../../../models/list";
import { TaskStatus } from "../../../models/status";

interface Props {
  tasks: List.Task[];
}

/**
 * A compact read-out of how the day is going: how much is finished, how much
 * is actively being worked on, and the share complete. Hidden on empty days,
 * where there is nothing to report.
 */
function DayProgress({ tasks }: Props) {
  const total = tasks.length;
  if (!total) return null;

  const done = tasks.filter((task) => task.status === TaskStatus.DONE).length;
  const inProgress = tasks.filter((task) => task.status === TaskStatus.IN_PROGRESS).length;
  const percent = Math.round((done / total) * 100);
  const isComplete = done === total;

  return (
    <Box className="day-progress" aria-label={`${percent}% of tasks done`}>
      <Box sx={{ display: "flex", alignItems: "baseline", gap: 1, mb: 0.75 }}>
        <Typography sx={{ fontSize: 12.5, color: "text.secondary", flex: 1 }}>
          {isComplete
            ? "All done for today"
            : `${done} of ${total} done${inProgress ? ` · ${inProgress} in progress` : ""}`}
        </Typography>
        <Typography
          sx={{
            fontSize: 12.5,
            fontWeight: 700,
            fontVariantNumeric: "tabular-nums",
            color: isComplete ? "primary.main" : "text.secondary",
          }}
        >
          {percent}%
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: "2px",
          height: 5,
          borderRadius: 3,
          overflow: "hidden",
          bgcolor: "divider",
        }}
      >
        {/* Zero-width segments are skipped so the flex gap leaves no stray sliver. */}
        {done > 0 && (
          <Box
            sx={{
              width: `${(done / total) * 100}%`,
              bgcolor: "primary.main",
              transition: "width .25s ease",
            }}
          />
        )}
        {inProgress > 0 && (
          <Box
            sx={{
              width: `${(inProgress / total) * 100}%`,
              bgcolor: "primary.light",
              transition: "width .25s ease",
            }}
          />
        )}
    </Box>
  );
}

export default DayProgress;
