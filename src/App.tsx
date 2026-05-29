// App.tsx
import { useEffect } from 'react';
import { useFocusStore } from './store/useFocusStore';
import MovieLane from './components/MovieLane';
import { MOCK_CATEGORIES } from './utils/mockData';




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

    const isPlayerActive = useFocusStore((state) => state.isPlayerActive);
    const openPlayer = useFocusStore((state) => state.openPlayer);
    const closePlayer = useFocusStore((state) => state.closePlayer);

    useEffect(() => {
        const handleKeyEvent = (event: KeyboardEvent) => {
            if (isPlayerActive) {
                // PLAYER CONTROLS
                if (event.key === 'Escape') {
                    event.preventDefault();
                    closePlayer();
                }
                return;
            }

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
                case 'Enter':
                    openPlayer('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4');
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyEvent);

        return () => {
            window.removeEventListener('keydown', handleKeyEvent);
        }
    }, [moveUp, moveDown, moveLeft, moveRight, isPlayerActive, closePlayer, openPlayer]);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-slate-900 text-white font-sans">
            <ul className="list-none overflow-x-auto whitespace-nowrap flex flex-col">
            {MOCK_CATEGORIES.map((lane, index) => {
                return (
                    <li key={lane.id}>
                        <MovieLane rowIndex={index} title={lane.title} items={lane.items} />
                    </li>
                );
            })}
            </ul>
        </div>
     );
}

export default App;