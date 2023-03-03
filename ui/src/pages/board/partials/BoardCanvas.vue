<template>
    <div
        class="cursor-pointer grow flex w-[3000px] h-[2000px]"
        data-test-id="board_canvas"
        @click="newTodo"
    >
        <Transition name="fade">
            <new-todo-form
                v-if="showAddTodoForm && coords"
                :origin="coords"
                @clear="clear"
            />
        </Transition>
        <todo-card />
    </div>
</template>

<script setup lang="ts">
import { handleCreateTodo } from "@/socket/handlers";
import { ref } from "vue";
import NewTodoForm from "@/pages/board/partials/NewTodoForm.vue";
import TodoCard from "@/pages/board/partials/TodoCard.vue";
import { useTodoStore } from "@/store/todo";
import type { ICoordinates } from "@shared/interfaces";

const todoStore = useTodoStore();
const coords = ref<ICoordinates>();
const showAddTodoForm = ref(false);

handleCreateTodo((todo) => todoStore.addTodoItem(todo));

const newTodo = (event: MouseEvent) => {
    coords.value = {
        x: event.pageX,
        y: event.pageY
    };
    showAddTodoForm.value = true;
};

const clear = () => {
    coords.value = undefined;
    showAddTodoForm.value = false;
};
</script>
