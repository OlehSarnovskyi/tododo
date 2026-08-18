import {List} from "../models/list";
import {ID} from "../components/TodoList/models/id";
import {AxiosInstance} from "axios";

// The user is identified by the signed initData header attached in
// api.service, so no request here carries a user id.

export function getTasksByUserIdAndDate(api: AxiosInstance): (date: string) => Promise<List.Task[]> {
    return (date) => {
        return api.get('tasks', { params: { date } }).then(res => res.data);
    };
}

export function addNewTask(api: AxiosInstance): (task: { date: string; text: string }) => Promise<void> {
    return (task) => {
        return api.post('tasks/add', task).then(res => res.data);
    };
}

export function deleteTask(api: AxiosInstance): (taskId: ID) => Promise<void> {
    return (taskId) => {
        return api.delete(`tasks/${taskId}`);
    };
}

export function editTask(api: AxiosInstance): (task: Pick<List.Task, '_id' | 'text'>) => Promise<void> {
    return (task) => {
        return api.patch(`tasks/${task._id}`, { text: task.text });
    };
}

export function setTaskStatus(api: AxiosInstance): (taskId: ID, status: string) => Promise<void> {
    return (taskId, status) => {
        return api.patch(`tasks/status/${taskId}`, { status });
    };
}

export function moveTask(api: AxiosInstance): (taskId: ID, date: string) => Promise<void> {
    return (taskId, date) => {
        return api.patch(`tasks/move/${taskId}`, { date });
    };
}

export function reorderTasks(api: AxiosInstance): (tasks: { _id: ID; order: number }[]) => Promise<void> {
    return (tasks) => {
        return api.patch('tasks/reorder', { tasks });
    };
}
