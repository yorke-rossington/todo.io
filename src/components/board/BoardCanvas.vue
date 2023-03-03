<template>
    <div
        class="cursor-pointer grow"
        @click="newTodo"
    >
        <Transition v-if="!!coords">
            <TodoCard
                :origin="coords"
                @clear="clear"
            />
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import TodoCard from "./TodoCard.vue";

const coords = ref<{ x: number; y: number }>();

const newTodo = (event: MouseEvent) => {
    coords.value = {
        x: event.clientX,
        y: event.clientY
    };
};

const clear = () => {
    coords.value = undefined;
};
</script>
