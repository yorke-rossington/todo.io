import type { TodoColour } from "@/pages/board/board.models";

export interface ITodo {
    id: string;
    title: string;
    description: string;
    username: string;
    colour: TodoColour;
    coordinates: ICoordinates;
}

export interface ICoordinates {
    x: number;
    y: number;
};
