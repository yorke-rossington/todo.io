<template>
    <div class="bg-white shadow rounded max-w-md w-full">
        <div class="px-4 py-5 sm:p-6">
            <h3 class="text-2xl font-semibold leading-6">Join the board!</h3>
            <div class="mt-2 max-w-xl text-gray-500">
                <p>Enter a username to join the board.</p>
            </div>
            <form
                class="mt-5 sm:flex items-end"
                @submit.prevent="joinBoard"
            >
                <div class="w-full sm:max-w-xs">
                    <label
                        for="username"
                        class="block text-sm font-medium leading-6"
                    >
                        Username
                    </label>
                    <div class="mt-2">
                        <input
                            id="username"
                            v-model="username"
                            type="text"
                            name="username"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Enter a username"
                        />
                    </div>
                </div>
                <UiButton
                    type="submit"
                    @click="joinBoard"
                    class="grow ml-2"
                >
                    Join
                </UiButton>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { socket } from "@/sockets";
import { useUserStore } from "@/store/user";
import { USER_EVENT } from "@server/events";
import { ref } from "vue";
import { useRouter } from "vue-router";
import UiButton from "../ui/UiButton.vue";

const userStore = useUserStore();
const router = useRouter();
const username = ref("");

const joinBoard = () => {
    socket.emit(USER_EVENT.RequestJoin, username.value);
};

socket.on(USER_EVENT.UserJoined, (username: string) => {
    userStore.setUsername(username);
    router.push({ name: "board" });
});
</script>
