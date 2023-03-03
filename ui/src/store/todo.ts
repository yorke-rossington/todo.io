import type { ITodo } from "@shared/interfaces";
import { defineStore } from "pinia";

interface ITodoState {
    todoItems: ITodo[];
}

export const useTodoStore = defineStore("todo", {
    state: (): ITodoState => ({ todoItems: [] }),
    actions: {
        addTodoItems(todoItems: ITodo[]) {
            this.todoItems = [...this.$state.todoItems, ...todoItems];
        },
        addTodoItem(todoItem: ITodo) {
            this.todoItems = [...this.$state.todoItems, todoItem];
        },
        removeTodoItem(id: string) {
            this.todoItems = [
                ...this.$state.todoItems.filter((item) => item.id !== id)
            ];
        }
    },
    getters: {
        getTodoItems(): ITodo[] {
            return this.todoItems;
        }
    }
});
