import { useCallback, useRef } from "react";
import { AxiosInstance } from "axios";
import { Dayjs } from "dayjs";

import {
  addNewTask,
  deleteTask,
  editTask,
  getTasksByUserIdAndDate,
  moveTask,
  setTaskStatus,
} from "../../../../services/tasks.service";
import { useSnackbar } from "../../../../services/snackbar.service";
import { List } from "../../../../models/list";
import { NEXT_STATUS, TaskStatus } from "../../../../models/status";
import { DATE_FORMAT } from "../../../../constants";

/** Short, human form of a date used in confirmations, e.g. "26 Dec". */
const LABEL_FORMAT = "DD MMM";

const STATUS_LABEL: Record<TaskStatus, string> = {
  [TaskStatus.TODO]: "Moved back to to do",
  [TaskStatus.IN_PROGRESS]: "Marked as in progress",
  [TaskStatus.DONE]: "Marked as done",
};

type SetTasks = (update: (previous: List.Task[]) => List.Task[]) => void;

interface Params {
  api: AxiosInstance;
  task: List.Task;
  date: Dayjs;
  setTasks: SetTasks;
}

interface RunOptions {
  /** Applied to the list straight away, before the request finishes. */
  optimistic?: () => void;
  /** Confirmation shown once the request succeeds. */
  success: string;
}

/**
 * Task mutations with a single-flight guard.
 *
 * Every action applies its change to the list immediately so the UI reacts
 * without waiting for the network, confirms with a message, and reloads the
 * day from the server if the request fails.
 */
export function useTaskActions({ api, task, date, setTasks }: Params) {
  const isSubmitting = useRef(false);
  const showSnackbar = useSnackbar();

  const reload = useCallback(async () => {
    const tasks = await getTasksByUserIdAndDate(api)(date.format(DATE_FORMAT));
    setTasks(() => tasks);
  }, [api, date, setTasks]);

  const run = useCallback(
    async (mutate: () => Promise<unknown>, { optimistic, success }: RunOptions): Promise<boolean> => {
      if (isSubmitting.current) return false;
      isSubmitting.current = true;
      optimistic?.();

      try {
        await mutate();
        showSnackbar(success, "success");
        return true;
      } catch {
        // The failure itself is already reported by the API interceptor.
        await reload();
        return false;
      } finally {
        isSubmitting.current = false;
      }
    },
    [reload, showSnackbar],
  );

  const removeFromList = useCallback(
    () => setTasks((previous) => previous.filter((item) => item._id !== task._id)),
    [setTasks, task._id],
  );

  const patchInList = useCallback(
    (changes: Partial<List.Task>) =>
      setTasks((previous) =>
        previous.map((item) => (item._id === task._id ? { ...item, ...changes } : item)),
      ),
    [setTasks, task._id],
  );

  // Offsets are relative to the day being viewed, not to today, so the target
  // date is named outright rather than called "tomorrow".
  const moveByDays = (days: number) => {
    const target = date.add(days, "day");

    return run(() => moveTask(api)(task._id, target.format(DATE_FORMAT)), {
      optimistic: removeFromList,
      success: `Moved to ${target.format(LABEL_FORMAT)}`,
    });
  };

  return {
    remove: () =>
      run(() => deleteTask(api)(task._id), {
        optimistic: removeFromList,
        success: "Task deleted",
      }),

    rename: (text: string) =>
      run(() => editTask(api)({ _id: task._id, text }), {
        optimistic: () => patchInList({ text }),
        success: "Task updated",
      }),

    cycleStatus: () => {
      const next = NEXT_STATUS[task.status] ?? TaskStatus.IN_PROGRESS;

      return run(() => setTaskStatus(api)(task._id, next), {
        optimistic: () => patchInList({ status: next }),
        success: STATUS_LABEL[next],
      });
    },

    moveToNextDay: () => moveByDays(1),

    moveToPreviousDay: () => moveByDays(-1),

    /**
     * Copies the task onto the following day and leaves this one untouched.
     * The current list does not change, so the confirmation is the only sign
     * anything happened.
     */
    copyToNextDay: () => {
      const target = date.add(1, "day");

      return run(() => addNewTask(api)({ date: target.format(DATE_FORMAT), text: task.text }), {
        success: `Copied to ${target.format(LABEL_FORMAT)}`,
      });
    },
  };
}
