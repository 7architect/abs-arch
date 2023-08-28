import { Task } from "./task-model.ts";

const taskRepository = {
    getTasks(): Task[] {
        return [
            task({
                id: 1,
                text: null,
                checked: false,
            })
        ]
    },

    updateTask(task: Task, updatable: Record<keyof typeof ITask, any>) {

    }
}