<script setup lang="ts">
import {useTasks} from "../entities/task/task-model.ts";

const tasks = useTasks();
tasks.getList();

</script>

<template>
  <div>
    <pre>
      {{ tasks.list }}
    </pre>
    <div :key="task.id" v-for="task of tasks.list" class="task">
      <span> id: {{ task.id }} </span>
      <input type="checkbox" :value="task.checked" @change="task.update({checked: !task.checked})" />
      <span> {{ task.text }} </span>
    </div>
  </div>
</template>

<style scoped>
.task {
  display: flex;
  align-items: center;
  * {
    margin-right: 1rem;
  }
}
</style>
