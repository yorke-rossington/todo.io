<template>
    <div
        class="absolute text-gray-800 cursor-auto z-10"
        data-test-id="new_todo_form"
        ref="addTodoCard"
        @click.stop
    >
        <div class="-top-1 -left-1 absolute">
            <span class="relative flex h-3 w-3">
                <span
                    class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500/75"
                ></span>
                <span
                    class="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"
                ></span>
            </span>
        </div>
        <div
            class="overflow-hidden rounded-lg shadow-xl w-80 ring-1 ring-black/10"
        >
            <div class="border-b border-gray-200 bg-white p-4 flex">
                <h3 class="font-semibold leading-6 grow uppercase">
                    Create A ToDo
                </h3>
                <div
                    class="text-sm cursor-pointer hover:text-gray-500"
                    @click="emits('clear')"
                >
                    <XMarkIcon class="h-5 w-5" />
                </div>
            </div>
            <div class="p-4 bg-gray-50">
                <form
                    class="w-full flex flex-col gap-4"
                    @submit.prevent="addTodo"
                >
                    <div
                        class="rounded-md px-3 pt-2.5 pb-1.5 shadow-sm ring-1 ring-inset bg-white ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600"
                    >
                        <label
                            for="todo-title"
                            class="block text-sm font-medium text-gray-600"
                        >
                            Title
                        </label>
                        <input
                            type="text"
                            data-test-id="new_todo_title"
                            required
                            v-model="formFields.title"
                            id="todo-title"
                            class="block w-full border-0 text-base p-0 placeholder:text-gray-400 focus:ring-0 sm:leading-6 font-medium"
                            placeholder="Your todo title"
                        />
                    </div>
                    <div
                        class="rounded-md px-3 pt-2.5 pb-1.5 shadow-sm ring-1 ring-inset bg-white ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600"
                    >
                        <label
                            for="todo-description"
                            class="block text-sm font-medium text-gray-600"
                        >
                            Description
                        </label>
                        <textarea
                            required
                            data-test-id="new_todo_description"
                            v-model="formFields.description"
                            id="todo-description"
                            class="block w-full rounded-md resize-none border-0 p-0 placeholder:text-gray-400 focus:ring-0 sm:leading-6 font-medium"
                            placeholder="Your todo details"
                            rows="5"
                        ></textarea>
                    </div>
                    <div class="mt-2 flex gap-2">
                        <radio-group v-model="formFields.colour">
                            <radio-group-label
                                class="block text-sm font-medium leading-2"
                            >
                                Colour
                            </radio-group-label>
                            <div class="mt-4 flex items-center space-x-2">
                                <radio-group-option
                                    as="template"
                                    v-for="colour in availableColours"
                                    :key="colour"
                                    :value="colour"
                                    v-slot="{ checked }"
                                >
                                    <div
                                        class="relative flex cursor-pointer items-center justify-center rounded-lg focus:outline-none ring-offset-gray-50"
                                        :class="[
                                            colourVariants[colour].ring,
                                            checked ? 'ring ring-offset-2' : ''
                                        ]"
                                    >
                                        <radio-group-label
                                            as="span"
                                            class="sr-only"
                                        >
                                            {{ colour }}
                                        </radio-group-label>
                                        <span
                                            aria-hidden="true"
                                            :class="[
                                                colourVariants[colour].main,
                                                'h-6 w-6 rounded-lg'
                                            ]"
                                        ></span>
                                    </div>
                                </radio-group-option>
                            </div>
                        </radio-group>
                    </div>
                    <ui-button
                        type="submit"
                        data-test-id="new_todo_create_button"
                        class="min-w-full"
                        title="Create todo"
                    >
                        Create
                    </ui-button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { watch, ref, onMounted } from "vue";
import UiButton from "@/components/ui/UiButton/UiButton.vue";
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from "@headlessui/vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";
import { useUserStore } from "@/store/user";
import type { ICoordinates, ITodo } from "@shared/interfaces";
import { useTodoStore } from "@/store/todo";
import { v4 } from "uuid";
import { requestToCreateTodo } from "@/socket/emitters";
import { colourVariants, TodoColour, type INewTodo } from "../board.models";

type ITodoCardProps = {
    origin: ICoordinates;
};

const props = defineProps<ITodoCardProps>();
const emits = defineEmits(["clear"]);
const userStore = useUserStore();
const todoStore = useTodoStore();

const addTodoCard = ref<HTMLDivElement>();
const availableColours = Object.values(TodoColour);
const formFields = ref<INewTodo>({
    title: "",
    description: "",
    colour: TodoColour.Blue
});

onMounted(() => {
    watch(props, () => setCardCoordinates(props.origin), { immediate: true });
});

const setCardCoordinates = (coordinates: ICoordinates) => {
    if (!addTodoCard.value) {
        return;
    }

    const parent = addTodoCard.value.parentElement;

    if (!parent) {
        return;
    }

    const maxX = parent.offsetWidth - addTodoCard.value.offsetWidth;
    const maxY = parent.offsetHeight - addTodoCard.value.offsetHeight;

    if (coordinates.x > maxX) {
        coordinates.x = maxX;
    }

    if (coordinates.y > maxY) {
        coordinates.y = maxY;
    }

    addTodoCard.value.style.left = `${coordinates.x}px`;
    addTodoCard.value.style.top = `${coordinates.y}px`;

    addTodoCard.value.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });
};

const addTodo = () => {
    const newTodo: ITodo = {
        ...formFields.value,
        id: v4(),
        username: userStore.getUsername ?? "Unknown",
        coordinates: props.origin
    };

    todoStore.addTodoItem(newTodo);
    requestToCreateTodo(newTodo);
    emits("clear");
};
</script>
