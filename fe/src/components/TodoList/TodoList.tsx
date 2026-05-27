import "./todo-list.css";
import CreateNew from "./components/CreateNew";
import Task from './components/Task/Task';
import { useState } from "react";
import { List } from "@mui/material";
import { addNewTask, getTasksByUserIdAndDate, reorderTasks } from "../../services/tasks.service";
import { useApiWithSnackbar } from "../../services/api.service";
import dayjs from "dayjs";
import { useLoading } from "../../services/loading.service";
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

function TodoList({ date, tasks, setTasksByUserIdAndDate }) {
  const api = useApiWithSnackbar();
  const [isAddingNewTask, setIsAddingNewTask] = useState(false);
  const { isLoading } = useLoading();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 5 } }),
  );

  function addTask(text: string): void {
    addNewTask(api)({ date: date.format('DD.MM.YYYY'), text }).then(() => {
      getTasksByUserIdAndDate(api)(date.format('DD.MM.YYYY')).then(fetched => {
        setTasksByUserIdAndDate(fetched);
      });
    });
  }

  function isToday(): boolean {
    return dayjs(date).isSame(dayjs(), 'day');
  }

  function handleDragEnd(event: DragEndEvent): void {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = tasks.findIndex(t => t._id === active.id);
    const newIndex = tasks.findIndex(t => t._id === over.id);
    const reordered = arrayMove(tasks, oldIndex, newIndex);

    setTasksByUserIdAndDate(reordered);

    reorderTasks(api)(
      reordered.map((t, index) => ({ _id: t._id, order: index }))
    );
  }

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
        {tasks.length > 0 &&
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={tasks.map(t => t._id)} strategy={verticalListSortingStrategy}>
              <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {tasks.map(task => (
                  <Task key={task._id} task={task} date={date} setTasksByUserIdAndDate={setTasksByUserIdAndDate} />
                ))}
              </List>
            </SortableContext>
          </DndContext>
        }
        {tasks.length === 0 &&
          <p className="todo-list-no-tasks">
            {isLoading ? 'Loading' : `No tasks for ${isToday() ? 'today' : 'this day'}`}
          </p>
        }
      </div>
    </div>
  );
}

export default TodoList;
