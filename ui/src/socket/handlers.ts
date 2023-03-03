import { TODO_EVENT, USER_EVENT } from "@shared/events";
import { socket } from "@/socket";
import type { ITodo } from "@shared/interfaces";

/**
 * Handles the event when a user joins
 * @param handle - Callback function to handle the event
 * @event USER_EVENT.JOINED
 */
export function handleUserJoined(handle: (username: string) => void) {
    socket.on(USER_EVENT.JOINED, (username: string) => {
        handle(username);
    });
}

/**
 * Handles the global event when a todo is created
 * @param handle - Callback function to handle the event
 * @event TODO_EVENT.CREATED
 */
export function handleCreateTodo(handle: (todo: ITodo) => void) {
    socket.on(TODO_EVENT.CREATED, (todo: ITodo) => {
        handle(todo);
    });
}

/**
 * Handles the global event when a todo is completed
 * @param handle - Callback function to handle the event
 * @event TODO_EVENT.COMPLETED
 */
export function handleCompletedTodo(handle: (id: string) => void) {
    socket.on(TODO_EVENT.COMPLETED, (id: string) => {
        handle(id);
    });
}
