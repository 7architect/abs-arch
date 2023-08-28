import {defineStore} from "pinia";
import {reactive, ref, toRefs} from "vue";

async function _mockGetTasks() {
    const _tasks:ITask[] = [
        {
            id: 1,
            text: 'Wake up and gets funny',
            checked: false,
        },
        {
            id: 2,
            text: 'make a coffee',
            checked: false,
        },
        {
            id: 3,
            text: 'Look at the window',
            checked: false,
        },
        {
            id: 4,
            text: 'Walk the dog',
            checked: false,
        },
        {
            id: 5,
            text: 'Meet friends',
            checked: false,
        },
    ]

    return new Promise(resolve => setTimeout(() => resolve(_tasks), 500))
}

export interface ITask {
    id: Number,
    text: string,
    checked: boolean,
}

export const useTask = defineStore('task', () => {
    const isLoading = ref(false);
    const state = reactive<ITask>({
        id: null,
        text: null,
        checked: null,
    });

    function from(initial: ITask) {
        Object.entries(initial).forEach(([key, value]) => {
            state[key] = value
        })
    }

    async function update(data) {
        return new Promise(resolve => setTimeout((() => {
            Object.entries(data).forEach(([key, value]) => {
                state[key] = value
            })
        }), 300))
    }

    return {
        ...toRefs(state),
        isLoading,
        update,
        from,
    }
});

export const useTasks = defineStore('tasks', () => {
    const isLoading = ref(false);
    const list = ref<ReturnType<typeof useTask>[]>([])

    async function getList() {
        isLoading.value = true

        const tasks = await _mockGetTasks();
        const tasksStores = tasks.map(task => {
            const taskStore = useTask()
            taskStore.from(task)
            return taskStore
        })

        list.value = tasksStores;

        isLoading.value = false
    }

    return {
        list,
        isLoading,
        getList,
    }
})