export enum TaskStatus {
    TODO = 'todo',
    IN_PROGRESS = 'in_progress',
    DONE = 'done',
}

// Tapping the status control advances to the next state (and wraps around).
export const NEXT_STATUS: Record<TaskStatus, TaskStatus> = {
    [TaskStatus.TODO]: TaskStatus.IN_PROGRESS,
    [TaskStatus.IN_PROGRESS]: TaskStatus.DONE,
    [TaskStatus.DONE]: TaskStatus.TODO,
};
