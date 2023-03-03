import type { ITodo } from "../../shared/interfaces";
import { prisma } from "../prisma";

export async function getActiveTodos() {
    const todos = await prisma.todo.findMany({
        where: { completed: false },
        include: { coordinates: true }
    });

    return todos;
}

export async function createTodo(todo: ITodo) {
    const newTodo = await prisma.todo.create({
        data: {
            id: todo.id,
            title: todo.title,
            description: todo.description,
            username: todo.username,
            colour: todo.colour,
            coordinates: { create: { ...todo.coordinates } }
        },
        include: { coordinates: true }
    });

    return newTodo;
}

export async function completeTodo(id: string) {
    const response = await prisma.todo.update({
        where: { id: id },
        data: { completed: true },
        select: { id: true }
    });

    return response;
}
