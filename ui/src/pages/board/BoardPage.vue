<template>
    <div class="bg-gray-100 flex flex-col grow text-white relative">
        <board-header />
        <board-canvas />
    </div>
</template>

<script setup lang="ts">
import BoardHeader from "@/pages/board/partials/BoardHeader.vue";
import BoardCanvas from "@/pages/board/partials/BoardCanvas.vue";
import { onMounted } from "vue";
import { getAllTodos } from "@/services/todo.service";
import { useTodoStore } from "@/store/todo";

const todoStore = useTodoStore();

const fetchTodos = async () => {
    const res = await getAllTodos();
    todoStore.addTodoItems(res);
};

onMounted(() => {
    fetchTodos();
});
</script>
