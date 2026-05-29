import VideoCard from './VideoCard';
import { useFocusStore } from '../store/useFocusStore';

interface MovieLaneProps {
    rowIndex: number;
    title: string;
    items: string[];
};

export default function MovieLane({ rowIndex, title, items }: MovieLaneProps) {
    const activeRow = useFocusStore((state) => state.activeRow);
    const activeColumn = useFocusStore((state) => state.activeColumn);

    const offset = () => {
        // Is this specific lane currently selected by the user?
        const isLaneFocused = activeRow === rowIndex;

        // If this lane is selected, shift it by the column index. If not, keep it at 0.
        const currentColumn = isLaneFocused ? activeColumn : 0;

        // Calculate exactly how many pixels to slide the lane left
        const CARD_WIDTH = 256; // Matching w-64 class (256px)
        const GAP_WIDTH = 24;   // Matching gap-6 class (24px)
        return currentColumn > 0 ? currentColumn * (CARD_WIDTH + GAP_WIDTH) : 0;
    }

    return (
        <div className="my-6">
            <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
            <ul 
                className="list-none p-0 m-0 py-4 px-4 overflow-hidden 
                            whitespace-nowrap flex flex-row gap-6
                            transition-transform duration-300 ease-out"
                style={{ transform: `translateX(-${offset()}px)` }}
            >
                {items.map((item, index) => {
                    const uniqueKey = `${item}-${rowIndex}-${index}`
                    return (
                        <li key={uniqueKey}>
                            <VideoCard rowIndex={rowIndex} colIndex={index} title={item} />
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}