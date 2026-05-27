import { create } from 'zustand';

interface FocusState {
    activeRow: number;
    activeColumn: number;
    moveUp: () => void;
    moveDown: (max: number) => void;
    moveLeft: () => void;
    moveRight: (max: number) => void;
    setCoordinates: (row: number, col: number) => void;
}

export const useFocusStore = create<FocusState>((set) => ({
    // Track the active row and column of the UI
    activeRow: 0,
    activeColumn: 0,

    moveUp: () => set((state) => ({ activeRow: Math.max(0, state.activeRow - 1) })),
    moveDown: (max) => set((state) => ({ activeRow: Math.min(max, state.activeRow + 1) })),
    moveLeft: () => set((state) => ({ activeColumn: Math.max(0, state.activeColumn - 1) })),
    moveRight: (max) => set((state) => ({ activeColumn: Math.min(max, state.activeColumn + 1) })),


    // Prevent dual-state renders by setting both at once
    setCoordinates: (row, col) => {
        set({ activeRow: row, activeColumn: col });
    },
}))