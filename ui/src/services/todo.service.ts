import type { ITodo } from "@shared/interfaces";

export async function getAllTodos(): Promise<ITodo[]> {
    const todos = await fetch(`${import.meta.env.VITE_API_URL}/todos`);

    if (!todos.ok) {
        // Add some nicer error handling
        throw new Error(todos.statusText);
    }

    return todos.json();
}
