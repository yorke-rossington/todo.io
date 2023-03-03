<template>
    <div class="bg-white shadow rounded max-w-md w-full">
        <div class="px-4 py-5 sm:p-6">
            <h3
                class="text-2xl font-semibold leading-6"
                data-test-id="join_title"
            >
                Join the board!
            </h3>
            <div class="mt-2 text-gray-500">
                <p>Enter a username to join the board.</p>
            </div>
            <form
                class="mt-5"
                @submit.prevent="joinBoard"
            >
                <div class="w-full">
                    <div
                        class="rounded-md px-3 pt-2.5 pb-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600"
                    >
                        <label
                            for="username"
                            class="block text-sm font-medium text-gray-600"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            data-test-id="join_username_input"
                            required
                            v-model="username"
                            class="block w-full border-0 text-base p-0 placeholder:text-gray-400 focus:ring-0 sm:leading-6 font-medium"
                            placeholder="Enter your username"
                        />
                    </div>
                    <ui-button
                        type="submit"
                        data-test-id="join_btn"
                        title="Join board"
                        class="w-full mt-2"
                    >
                        Join
                    </ui-button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { handleUserJoined } from "@/socket/handlers";
import { useUserStore } from "@/store/user";
import { ref } from "vue";
import { useRouter } from "vue-router";
import UiButton from "@/components/ui/UiButton/UiButton.vue";
import { requestToJoin } from "@/socket/emitters";

const userStore = useUserStore();
const router = useRouter();
const username = ref("");

handleUserJoined((username) => {
    userStore.setUsername(username);
    router.push({ name: "board" });
});

const joinBoard = () => {
    requestToJoin(username.value);
};
</script>
