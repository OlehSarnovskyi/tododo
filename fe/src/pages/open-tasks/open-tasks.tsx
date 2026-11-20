import "./open-tasks.css";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { Button, Link } from "@mui/material";
import TodayIcon from "@mui/icons-material/Today";

import { getOpenTasks, moveTask } from "../../services/tasks.service";
import { useApiWithSnackbar } from "../../services/api.service";
import { useSnackbar } from "../../services/snackbar.service";
import { useLoading } from "../../services/loading.service";
import { List } from "../../models/list";
import { DATE_FORMAT } from "../../constants";
import { parseTaskDate } from "../../utils/date";
import TaskStatusIcon from "../../components/TaskStatusIcon";

type SectionKey = "skipped" | "upcoming";

const TOTAL_KEY: Record<SectionKey, "skippedTotal" | "upcomingTotal"> = {
  skipped: "skippedTotal",
  upcoming: "upcomingTotal",
};

interface DayGroup {
  date: string;
  tasks: List.Task[];
}

/** Tasks arrive sorted by day, so consecutive runs of one date form a group. */
function groupByDate(tasks: List.Task[]): DayGroup[] {
  const groups: DayGroup[] = [];

  for (const task of tasks) {
    const last = groups[groups.length - 1];
    if (last?.date === task.date) {
      last.tasks.push(task);
    } else {
      groups.push({ date: task.date, tasks: [task] });
    }
  }

  return groups;
}

function describeDay(value: string): { label: string; relative: string } {
  const day = parseTaskDate(value);
  const today = dayjs().startOf("day");
  const diff = day.diff(today, "day");

  const relative =
    diff === -1 ? "yesterday"
      : diff === 1 ? "tomorrow"
        : diff < 0 ? `${-diff} days ago`
          : `in ${diff} days`;

  const label = day.format(day.year() === today.year() ? "ddd, DD MMM" : "ddd, DD MMM YYYY");

  return { label, relative };
}

interface SectionProps {
  title: string;
  tasks: List.Task[];
  total: number;
  emptyText: string;
  onOpenDay: (date: string) => void;
  onDoToday: (task: List.Task) => void;
}

function TaskSection({ title, tasks, total, emptyText, onOpenDay, onDoToday }: SectionProps) {
  return (
    <section className="open-tasks__section">
      <h2 className="open-tasks__heading">
        {title} <span>{total}</span>
      </h2>

      {!tasks.length && <p className="open-tasks__note">{emptyText}</p>}

      {groupByDate(tasks).map(({ date, tasks: dayTasks }) => {
        const { label, relative } = describeDay(date);

        return (
          <div key={date} className="open-tasks__day">
            <button className="open-tasks__day-label" onClick={() => onOpenDay(date)}>
              {label} <small>· {relative}</small>
            </button>

            <ul className="open-tasks__tasks">
              {dayTasks.map((task) => (
                <li key={task._id} className="open-tasks__task">
                  <span className="open-tasks__status">
                    <TaskStatusIcon status={task.status} fontSize="small" />
                  </span>
                  <button className="open-tasks__text" onClick={() => onOpenDay(date)}>
                    {task.text}
                  </button>
                  <Button
                    size="small"
                    startIcon={<TodayIcon fontSize="small" />}
                    onClick={() => onDoToday(task)}
                    // Repeated on every row, so kept quiet: sentence case, small, no
                    // uppercase shouting that would outweigh the task itself.
                    sx={{
                      flex: "0 0 auto",
                      whiteSpace: "nowrap",
                      textTransform: "none",
                      fontSize: 13,
                      fontWeight: 500,
                      px: 1,
                    }}
                  >
                    Do today
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        );
      })}

      {total > tasks.length && (
        <p className="open-tasks__note">Showing {tasks.length} of {total}.</p>
      )}
    </section>
  );
}

/**
 * Everything not marked done, outside today: what slipped through on earlier
 * days, and what is already planned for later ones.
 */
function OpenTasks() {
  const api = useApiWithSnackbar();
  const showSnackbar = useSnackbar();
  const navigate = useNavigate();
  const { isLoading } = useLoading();
  const [data, setData] = useState<List.OpenTasks | null>(null);

  // The client's own "today": the server runs in UTC and would put the day
  // boundary in the wrong place.
  const today = dayjs().format(DATE_FORMAT);

  const load = useCallback(
    () => getOpenTasks(api)(today).then(setData).catch(() => undefined),
    [api, today],
  );

  useEffect(() => {
    load();
  }, [load]);

  function openDay(date: string): void {
    navigate("/", { state: { date } });
  }

  async function doToday(task: List.Task, section: SectionKey): Promise<void> {
    const totalKey = TOTAL_KEY[section];

    // The task leaves this page either way, so drop it before the request.
    setData((previous) =>
      previous && {
        ...previous,
        [section]: previous[section].filter((item) => item._id !== task._id),
        [totalKey]: previous[totalKey] - 1,
      },
    );

    try {
      await moveTask(api)(task._id, today);
      showSnackbar("Moved to today", "success");
    } catch {
      // Already reported by the API interceptor (a full day, for instance).
      load();
    }
  }

  return (
    <div className="open-tasks">
      <Link component="button" onClick={() => navigate("/")}>Go back</Link>
      <h1>Open tasks</h1>
      <p className="open-tasks__lede">
        Everything not done yet, outside today. Tap a task to open its day.
      </p>

      {data === null ? (
        <p className="open-tasks__note">{isLoading ? "Loading" : ""}</p>
      ) : (
        <>
          <TaskSection
            title="Skipped"
            tasks={data.skipped}
            total={data.skippedTotal}
            emptyText="Nothing left behind on earlier days."
            onOpenDay={openDay}
            onDoToday={(task) => doToday(task, "skipped")}
          />
          <TaskSection
            title="Upcoming"
            tasks={data.upcoming}
            total={data.upcomingTotal}
            emptyText="Nothing planned for the days ahead."
            onOpenDay={openDay}
            onDoToday={(task) => doToday(task, "upcoming")}
          />
        </>
      )}
    </div>
  );
}

export default OpenTasks;
