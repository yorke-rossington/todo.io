<template>
    <div
        class="cursor-default absolute p-4 w-full"
        data-test-id="todo_card"
        v-for="todo in todoStore.getTodoItems"
        :key="todo.id"
        @click.stop
    >
        <div
            :style="{
                position: 'absolute',
                top: `${todo.coordinates.y}px`,
                left: `${todo.coordinates.x}px`
            }"
            class="max-w-64 w-64 text-gray-700"
            :class="[colourVariants[todo.colour].main]"
        >
            <div
                class="p-2 ring-2 rounded w-full shadow-md flex flex-col gap-4"
                :class="[
                    colourVariants[todo.colour].bg,
                    colourVariants[todo.colour].ring
                ]"
            >
                <div class="flex gap-2 justify-between items-start">
                    <h2
                        class="font-semibold grow"
                        :data-test-id="`todo_card_title-${todo.title}`"
                    >
                        {{ todo.title }}
                    </h2>
                    <ui-button
                        variant="secondary"
                        :data-test-id="`todo_card_complete_button-${todo.title}`"
                        title="Complete todo"
                        circular
                        icon
                        @click="() => removeTodo(todo.id)"
                    >
                        <CheckIcon class="h-5 w-5" />
                    </ui-button>
                </div>
                <div>
                    <p class="text-gray-500 whitespace-pre-wrap">
                        {{ todo.description }}
                    </p>
                </div>
                <div class="italic text-gray-400 text-sm justify-end flex">
                    <p>
                        Created by
                        <strong class="text-gray-500">{{
                            todo.username
                        }}</strong>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { handleCompletedTodo } from "@/socket/handlers";
import { useTodoStore } from "@/store/todo";
import { CheckIcon } from "@heroicons/vue/24/outline";
import UiButton from "@/components/ui/UiButton/UiButton.vue";
import { requestToCompleteTodo } from "@/socket/emitters";
import { colourVariants } from "../board.models";

const todoStore = useTodoStore();

handleCompletedTodo((id: string) => todoStore.removeTodoItem(id));

const removeTodo = (id: string) => {
    todoStore.removeTodoItem(id);
    requestToCompleteTodo(id);
};
</script>
