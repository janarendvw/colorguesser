import { create } from "zustand";

type Attempt = {
  score: number;
  guessedColor: string;
  generatedColor: string;
};

type Store = {
  generatedColor: string;
  guessedHexColor: (string | null)[];
  guessedHslColor: (string | null)[];
  guessedRgbColor: (string | null)[];
  attempts: Attempt[];
  highScore: number;
  caretPosition: number;
  setGeneratedColor: (color: string) => void;
  resetGuessedHexColor: () => void;
  updateGuessedHexColor: (index: number, value: string | null) => void;
  resetGuessedHslColor: () => void;
  updateGuessedHslColor: (index: number, value: string | null) => void;
  resetGuessedRgbColor: () => void;
  updateGuessedRgbColor: (index: number, value: string | null) => void;
  addAttempt: (attempt: Attempt) => void;
  setHighScore: (score: number) => void;
  resetAttempts: () => void;
  setCaretPosition: (position: number) => void;
};

export const useStore = create<Store>((set) => ({
  generatedColor: "",
  guessedHexColor: Array(6).fill(null) as (string | null)[],
  guessedHslColor: Array(3).fill(null) as (string | null)[],
  guessedRgbColor: Array(3).fill(null) as (string | null)[],
  attempts: [],
  highScore: localStorage.getItem("highscore")
    ? parseInt(localStorage.getItem("highscore") as string)
    : 0,
  caretPosition: 0,
  setGeneratedColor: (color) => set(() => ({ generatedColor: color })),
  resetGuessedHexColor: () => set(() => ({ guessedHexColor: [null, null, null, null, null, null] })),
  updateGuessedHexColor: (index, value) =>
    set((state) => {
      const newGuessedHexColor = [...state.guessedHexColor];
      newGuessedHexColor[index] = value;
      return { guessedHexColor: newGuessedHexColor };
    }),
  resetGuessedHslColor: () => set(() => ({ guessedHslColor: [null, null, null] })),
  updateGuessedHslColor: (index, value) =>
    set((state) => {
      const newGuessedHslColor = [...state.guessedHslColor];
      newGuessedHslColor[index] = value;
      return { guessedHslColor: newGuessedHslColor };
    }),
  resetGuessedRgbColor: () => set(() => ({ guessedRgbColor: [] })),
  updateGuessedRgbColor: (index, value) =>
    set((state) => {
      const newGuessedRgbColor = [...state.guessedRgbColor];
      newGuessedRgbColor[index] = value;
      return { guessedRgbColor: newGuessedRgbColor };
    }),
  addAttempt: (attempt) =>
    set((state) => ({ attempts: [...state.attempts, attempt] })),
  setHighScore: (score) => set(() => ({ highScore: score })),
  resetAttempts: () => set(() => ({ attempts: [] })),
  setCaretPosition: (position) => set(() => ({ caretPosition: position })),
}));
