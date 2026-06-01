import { create } from 'zustand';

interface LaneData {
    id: string;
    title: string;
    items: string[];
}

interface FocusState {
    activeRow: number;
    activeColumn: number;
    moveUp: () => void;
    moveDown: () => void;
    moveLeft: () => void;
    moveRight: () => void;
    setCoordinates: (row: number, col: number) => void;
    isPlayerActive: boolean;
    activeVideoUrl: string | null;
    openPlayer: (url: string) => void;
    closePlayer: () => void;
    data: LaneData[];
    setData: (data: LaneData[]) => void;
}

export const useFocusStore = create<FocusState>((set) => ({
    // Track the active row and column of the UI
    activeRow: 0,
    activeColumn: 0,

    moveUp: () => set((state) => ({ activeRow: Math.max(0, state.activeRow - 1) })),
    moveDown: () => set((state) => { 
        const maxRowIndex = state.data.length - 1;
        return {
            activeRow: Math.min(maxRowIndex, state.activeRow + 1)
        };
    }),
    moveLeft: () => set((state) => ({ activeColumn: Math.max(0, state.activeColumn - 1) })),
    moveRight: () => set((state) => { 
        const currentRow = state.data[state.activeRow];
        const maxColIndex = currentRow ? currentRow.items.length - 1 : 0;
        return {
            activeColumn: Math.min(maxColIndex, state.activeColumn + 1) 
        };
    }),

    // Prevent dual-state renders by setting both at once
    setCoordinates: (row, col) => {
        set({ activeRow: row, activeColumn: col });
    },

    isPlayerActive: false,
    activeVideoUrl: null,

    openPlayer: (url) => set({ isPlayerActive: true, activeVideoUrl: url }),
    closePlayer: () => set({ isPlayerActive: false, activeVideoUrl: null }),

    data: [],
    setData: (data) => set({ data }),

}));
