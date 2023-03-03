<template>
    <div
        class="fixed text-gray-800 cursor-auto"
        ref="todoCard"
        @click.prevent="($event) => $event.stopPropagation()"
    >
        <div
            class="overflow-hidden rounded-lg shadow-lg w-80 ring-2"
            :class="[selectedColor.selectedColor]"
        >
            <div class="border-b border-gray-200 bg-white p-4 flex">
                <h3 class="font-semibold leading-6 grow uppercase">
                    Create A ToDo
                </h3>
                <div
                    class="text-sm cursor-pointer hover:text-gray-500"
                    @click="emits('clear')"
                >
                    Close
                </div>
            </div>
            <div class="p-4">
                <form
                    class="w-full flex flex-col gap-4"
                    @submit.prevent="addTodo"
                >
                    <div>
                        <label
                            for="title"
                            class="block text-sm font-medium leading-2"
                        >
                            Title
                        </label>
                        <div class="mt-2">
                            <input
                                id="title"
                                type="text"
                                name="title"
                                class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="Enter a todo title"
                            />
                        </div>
                    </div>
                    <div>
                        <label
                            for="description"
                            class="block text-sm font-medium leading-2"
                        >
                            Description
                        </label>
                        <div class="mt-2">
                            <textarea
                                id="description"
                                name="description"
                                class="block w-full rounded-md resize-none border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="Enter a todo item"
                                rows="5"
                            ></textarea>
                        </div>
                    </div>
                    <div>
                        <label
                            for="colours"
                            class="block text-sm font-medium leading-2"
                        >
                            Colour
                        </label>
                        <div class="mt-2 flex gap-2">
                            <RadioGroup v-model="selectedColor">
                                <RadioGroupLabel
                                    class="block text-sm font-medium leading-6 text-gray-900"
                                    >Choose a label color</RadioGroupLabel
                                >
                                <div class="mt-4 flex items-center space-x-2">
                                    <RadioGroupOption
                                        as="template"
                                        v-for="color in colours"
                                        :key="color.name"
                                        :value="color"
                                        v-slot="{ active, checked }"
                                    >
                                        <div
                                            :class="[
                                                color.selectedColor,
                                                active && checked
                                                    ? 'ring ring-offset-2'
                                                    : '',
                                                !active && checked
                                                    ? 'ring ring-offset-2'
                                                    : '',
                                                'relative flex cursor-pointer items-center justify-center rounded-lg focus:outline-none'
                                            ]"
                                        >
                                            <RadioGroupLabel
                                                as="span"
                                                class="sr-only"
                                                >{{
                                                    color.name
                                                }}</RadioGroupLabel
                                            >
                                            <span
                                                aria-hidden="true"
                                                :class="[
                                                    color.bgColor,
                                                    'h-6 w-6 rounded-lg'
                                                ]"
                                            ></span>
                                        </div>
                                    </RadioGroupOption>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>
                    <UiButton
                        type="submit"
                        class="min-w-full"
                    >
                        Create
                    </UiButton>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { watch, ref, onMounted } from "vue";
import UiButton from "../ui/UiButton.vue";
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from "@headlessui/vue";

const colours = [
    {
        name: "Pink",
        bgColor: "bg-pink-500",
        pale: "bg-pink-50",
        selectedColor: "ring-pink-500"
    },
    {
        name: "Purple",
        bgColor: "bg-purple-500",
        pale: "bg-purple-50",
        selectedColor: "ring-purple-500"
    },
    {
        name: "Blue",
        bgColor: "bg-blue-500",
        pale: "bg-blue-50",
        selectedColor: "ring-blue-500"
    },
    {
        name: "Green",
        bgColor: "bg-green-500",
        pale: "bg-green-50",
        selectedColor: "ring-green-500"
    },
    {
        name: "Yellow",
        bgColor: "bg-yellow-500",
        pale: "bg-yellow-50",
        selectedColor: "ring-yellow-500"
    }
];

type ITodoCardProps = {
    origin: {
        x: number;
        y: number;
    };
};

const props = defineProps<ITodoCardProps>();
const emits = defineEmits(["clear"]);

const todoCard = ref<HTMLDivElement>();
const selectedColor = ref(colours[2]);

onMounted(() => {
    watch(
        props,
        () => {
            console.log(props.origin);

            let { x, y } = props.origin;

            if (todoCard.value) {
                const maxX = window.innerWidth - todoCard.value.offsetWidth;
                const maxY = window.innerHeight - todoCard.value.offsetHeight;

                if (x > maxX) {
                    x = maxX - 5;
                }

                if (y > maxY) {
                    y = maxY - 5;
                }

                todoCard.value.style.left = `${x}px`;
                todoCard.value.style.top = `${y}px`;
            }
        },
        { immediate: true }
    );
});

const addTodo = () => {
    console.log("add todo");
};
</script>
