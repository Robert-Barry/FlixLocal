// App.tsx
import React, { useEffect } from 'react';
import { useFocusStore } from './store/useFocusStore'


// ArrowUp, ArrowDown, ArrowLeft, ArrowRight
function App() {
    const MAX_ROW_INDEX = 2;
    const MAX_COL_INDEX = 4;

    const moveUp = useFocusStore((state) => state.moveUp);
    const moveDown = useFocusStore((state) => state.moveDown);
    const moveLeft = useFocusStore((state) => state.moveLeft);
    const moveRight = useFocusStore((state) => state.moveRight);

    const activeRow = useFocusStore((state) => state.activeRow);
    const activeColumn = useFocusStore((state) => state.activeColumn);

    useEffect(() => {
        const handleKeyEvent = (event: KeyboardEvent) => {
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
                event.preventDefault();
            }
            
            switch (event.key) {
                case 'ArrowUp':
                    moveUp();
                    break;
                case 'ArrowDown':
                    moveDown(MAX_ROW_INDEX);
                    break;
                case 'ArrowLeft':
                    moveLeft();
                    break;
                case 'ArrowRight':
                    moveRight(MAX_COL_INDEX);
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyEvent);

        return () => {
            window.removeEventListener('keydown', handleKeyEvent);
        }
    }, [moveUp, moveDown, moveLeft, moveRight]);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-slate-900 text-white font-sans">
            <h1 className="text-3xl font-bold mb-4">📺 FlixLocal Focus Engine Test</h1>
            <div className="p-4 bg-slate-800 rounded-lg border border-slate-700 shadow-xl text-lg">
                <p>Active Coordinates: <span className="text-yellow-400 font-mono">[{activeRow}, {activeColumn}]</span></p>
            </div>
            <p className="mt-4 text-sm text-slate-400">Use your keyboard Arrow Keys to navigate</p>
        </div>
     );
}

export default App;
