import { create } from 'zustand';

interface FocusState {
    activeRow: number;
    activeColumn: number;
    setActiveRow: (row: number) => void;
    setActiveColumn: (col: number) => void;
    setCoordinates: (row: number, col: number) => void;
}

export const useFocus = create<FocusState>((set) => ({
    // Track the active row and column of the UI
    activeRow: 0,
    activeColumn: 0,

    setActiveRow: (row) => set({ activeRow: row }),
    setActiveColumn: (col) => set({ activeColumn: col }),

    // Prevent dual-state renders
    setCoordinates: (row, col) => {
        set({ activeRow: row, activeColumn: col });
    },
}))