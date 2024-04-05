import { create } from "zustand";
import generateColor from "../utils/color-generator";

type Attempt = {
    score: number;
    guesssedColor: string;
    generatedColor: string;
};

type Store = {
    generatedColor: string;
    guesssedColor: (string | null)[];
    attempts: Attempt[];
    highScore: number;
    caretPosition: number;
    setGeneratedColor: (color: string) => void;
    resetGuesssedColor: () => void;
    updateGuesssedColor: (index: number, value: (string | null)) => void;
    addAttempt: (attempt: Attempt) => void;
    setHighScore: (score: number) => void;
    resetAttempts: () => void;
    setCaretPosition: (position: number) => void;
};

export const useStore = create<Store>((set) => ({
    generatedColor: generateColor(),
    guesssedColor: Array(6).fill(null) as (string | null)[],
    attempts: [],
    highScore: localStorage.getItem("highscore") ? parseInt(localStorage.getItem("highscore") as string) : 0,
    caretPosition: 0,
    setGeneratedColor: (color) => set(() => ({ generatedColor: color })),
    resetGuesssedColor: () => set(() => ({ guesssedColor: [] })),
    updateGuesssedColor: (index, value) => set((state) => {
        const newGuesssedColor = [...state.guesssedColor];
        newGuesssedColor[index] = value;
        return { guesssedColor: newGuesssedColor };
    }),
    addAttempt: (attempt) => set((state) => ({ attempts: [...state.attempts, attempt] })),
    setHighScore: (score) => set(() => ({ highScore: score })),
    resetAttempts: () => set(() => ({ attempts: [] })),
    setCaretPosition: (position) => set(() => ({ caretPosition: position })),
}));