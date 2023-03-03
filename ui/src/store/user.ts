import { defineStore } from "pinia";

interface IUserState {
    username?: string;
}

export const useUserStore = defineStore("user", {
    state: (): IUserState => ({ username: undefined }),
    actions: {
        setUsername(username: string) {
            this.username = username;
        }
    },
    getters: {
        getUsername(): string | undefined {
            return this.username;
        }
    }
});
