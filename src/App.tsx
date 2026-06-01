// App.tsx
import { useEffect } from 'react';
import { useFocusStore } from './store/useFocusStore';
import MovieLane from './components/MovieLane';
import { MOCK_CATEGORIES } from './utils/mockData';
import VideoPlayer from './components/VideoPlayer';

// ArrowUp, ArrowDown, ArrowLeft, ArrowRight
function App() {

    const moveUp = useFocusStore((state) => state.moveUp);
    const moveDown = useFocusStore((state) => state.moveDown);
    const moveLeft = useFocusStore((state) => state.moveLeft);
    const moveRight = useFocusStore((state) => state.moveRight);

    //const activeRow = useFocusStore((state) => state.activeRow);
    //const activeColumn = useFocusStore((state) => state.activeColumn);

    const isPlayerActive = useFocusStore((state) => state.isPlayerActive);
    const openPlayer = useFocusStore((state) => state.openPlayer);
    const closePlayer = useFocusStore((state) => state.closePlayer);

    const setData = useFocusStore((state) => state.setData);

    useEffect(() => {
        setData(MOCK_CATEGORIES);
    }, [setData]);

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
                    moveDown();
                    break;
                case 'ArrowLeft':
                    moveLeft();
                    break;
                case 'ArrowRight':
                    moveRight();
                    break;
                case 'Enter':
                    openPlayer('https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8');
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
            { isPlayerActive && <VideoPlayer /> }
        </div>
     );
}

export default App;