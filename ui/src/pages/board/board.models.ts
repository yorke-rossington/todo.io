export enum TodoColour {
    Green = "green",
    Blue = "blue",
    Red = "red",
    Yellow = "yellow",
    Purple = "purple",
    Orange = "orange",
    Pink = "pink"
}

interface IColourSettings {
    main: string;
    bg: string;
    ring: string;
}

export type Colour = {
    [key in TodoColour]: IColourSettings;
};

export const colourVariants: Colour = {
    green: {
        main: "bg-green-500",
        bg: "bg-green-50",
        ring: "ring-green-500"
    },
    yellow: {
        main: "bg-yellow-500",
        bg: "bg-yellow-50",
        ring: "ring-yellow-500"
    },
    red: {
        main: "bg-red-500",
        bg: "bg-red-50",
        ring: "ring-red-500"
    },
    blue: {
        main: "bg-blue-500",
        bg: "bg-blue-50",
        ring: "ring-blue-500"
    },
    purple: {
        main: "bg-purple-500",
        bg: "bg-purple-50",
        ring: "ring-purple-500"
    },
    pink: {
        main: "bg-pink-500",
        bg: "bg-pink-50",
        ring: "ring-pink-500"
    },
    orange: {
        main: "bg-orange-500",
        bg: "bg-orange-50",
        ring: "ring-orange-500"
    }
};

export interface INewTodo {
    title: string;
    description: string;
    colour: TodoColour;
}
