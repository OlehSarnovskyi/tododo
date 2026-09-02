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

type SetTasks = (update: (previous: List.Task[]) => List.Task[]) => void;

interface Params {
  api: AxiosInstance;
  task: List.Task;
  date: Dayjs;
  setTasks: SetTasks;
}

/**
 * Task mutations with a single-flight guard.
 *
 * Every action applies its change to the list immediately so the UI reacts
 * without waiting for the network, and reloads the day from the server if the
 * request fails.
 */
export function useTaskActions({ api, task, date, setTasks }: Params) {
  const isSubmitting = useRef(false);
  const showSnackbar = useSnackbar();

  const reload = useCallback(async () => {
    const tasks = await getTasksByUserIdAndDate(api)(date.format(DATE_FORMAT));
    setTasks(() => tasks);
  }, [api, date, setTasks]);

  const run = useCallback(
    async (mutate: () => Promise<unknown>, optimistic?: () => void): Promise<boolean> => {
      if (isSubmitting.current) return false;
      isSubmitting.current = true;
      optimistic?.();

      try {
        await mutate();
        return true;
      } catch {
        await reload();
        return false;
      } finally {
        isSubmitting.current = false;
      }
    },
    [reload],
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

  const moveByDays = (days: number) => {
    const target = date.add(days, "day").format(DATE_FORMAT);
    return run(() => moveTask(api)(task._id, target), removeFromList);
  };

  return {
    remove: () => run(() => deleteTask(api)(task._id), removeFromList),

    rename: (text: string) =>
      run(() => editTask(api)({ _id: task._id, text }), () => patchInList({ text })),

    cycleStatus: () => {
      const next = NEXT_STATUS[task.status] ?? TaskStatus.IN_PROGRESS;
      return run(() => setTaskStatus(api)(task._id, next), () => patchInList({ status: next }));
    },

    // Moving takes the task off the current day, so the row goes immediately.
    moveToTomorrow: () => moveByDays(1),

    moveToYesterday: () => moveByDays(-1),

    /**
     * Copies the task onto tomorrow and leaves today's untouched. The current
     * list does not change, so without a confirmation the tap would look like
     * nothing happened.
     */
    copyToTomorrow: async () => {
      const tomorrow = date.add(1, "day").format(DATE_FORMAT);
      const copied = await run(() => addNewTask(api)({ date: tomorrow, text: task.text }));

      if (copied) {
        showSnackbar("Copied to tomorrow", "success");
      }

      return copied;
    },
  };
}
