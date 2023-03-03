import { socket } from "@/socket";
import type { ITodo } from "@shared/interfaces";
import { TODO_EVENT } from "@shared/events";
import { USER_EVENT } from "@shared/events";

export function requestToJoin(username: string) {
    socket.emit(USER_EVENT.REQUEST_JOIN, username);
}

export function requestToCreateTodo(todoItem: ITodo) {
    socket.emit(TODO_EVENT.REQUEST_CREATE, todoItem);
}

export function requestToCompleteTodo(id: string) {
    socket.emit(TODO_EVENT.REQUEST_COMPLETE, id);
}
