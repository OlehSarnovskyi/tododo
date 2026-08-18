import "./todo-list.css";
import { Dispatch, SetStateAction, useState } from "react";
import { List as MuiList } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";

import CreateNew from "./components/CreateNew";
import Task from "./components/Task/Task";
import { addNewTask, getTasksByUserIdAndDate, reorderTasks } from "../../services/tasks.service";
import { useApiWithSnackbar } from "../../services/api.service";
import { useLoading } from "../../services/loading.service";
import { List } from "../../models/list";
import { DATE_FORMAT } from "../../constants";

interface Props {
  date: Dayjs;
  tasks: List.Task[];
  setTasksByUserIdAndDate: Dispatch<SetStateAction<List.Task[]>>;
}

function TodoList({ date, tasks, setTasksByUserIdAndDate }: Props) {
  const api = useApiWithSnackbar();
  const [isAddingNewTask, setIsAddingNewTask] = useState(false);
  const { isLoading } = useLoading();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    // A short hold distinguishes dragging from scrolling on touch screens.
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 5 } }),
  );

  async function addTask(text: string): Promise<void> {
    const formattedDate = date.format(DATE_FORMAT);
    await addNewTask(api)({ date: formattedDate, text });
    setTasksByUserIdAndDate(await getTasksByUserIdAndDate(api)(formattedDate));
  }

  function handleDragEnd({ active, over }: DragEndEvent): void {
    if (!over || active.id === over.id) return;

    const oldIndex = tasks.findIndex((task) => task._id === active.id);
    const newIndex = tasks.findIndex((task) => task._id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    const reordered = arrayMove(tasks, oldIndex, newIndex);
    setTasksByUserIdAndDate(reordered);

    reorderTasks(api)(reordered.map((task, index) => ({ _id: task._id, order: index })));
  }

  const isToday = dayjs(date).isSame(dayjs(), "day");

  return (
    <div className="todo-list">
      <CreateNew
        instance="Task"
        setIsAddingNew={setIsAddingNewTask}
        isAddingNew={isAddingNewTask}
        addNew={addTask}
      />
      <hr />
      <div className="todo-list-tasks">
        {tasks.length > 0 ? (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext
              items={tasks.map((task) => task._id)}
              strategy={verticalListSortingStrategy}
            >
              <MuiList sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
                {tasks.map((task) => (
                  <Task
                    key={task._id}
                    task={task}
                    date={date}
                    setTasksByUserIdAndDate={setTasksByUserIdAndDate}
                  />
                ))}
              </MuiList>
            </SortableContext>
          </DndContext>
        ) : (
          <p className="todo-list-no-tasks">
            {isLoading ? "Loading" : `No tasks for ${isToday ? "today" : "this day"}`}
          </p>
        )}
      </div>
    </div>
  );
}

export default TodoList;
