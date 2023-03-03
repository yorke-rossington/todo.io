import type { Server } from "socket.io";
import { completeTodo, createTodo } from "../services/todo.service";
import { TODO_EVENT, USER_EVENT } from "../../shared/events";
import type { ITodo } from "../../shared/interfaces";

export const setupSockets = (io: Server) => {
    io.on("connection", (socket) => {
        socket.on(USER_EVENT.REQUEST_JOIN, (username: string) => {
            socket.emit(USER_EVENT.JOINED, username);
        });

        socket.on(TODO_EVENT.REQUEST_CREATE, async (todo: ITodo) => {
            const newTodo = await createTodo(todo);

            socket.broadcast.emit(TODO_EVENT.CREATED, newTodo);
        });

        socket.on(TODO_EVENT.REQUEST_COMPLETE, async (id: string) => {
            const response = await completeTodo(id);

            socket.broadcast.emit(TODO_EVENT.COMPLETED, response.id);
        });
    });
};
