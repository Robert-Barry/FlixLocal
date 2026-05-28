import VideoCard from './VideoCard';

interface MovieLaneProps {
    rowIndex: number;
    title: string;
    items: string[];
};

export default function MovieLanes({ rowIndex, title, items }: MovieLaneProps) {
    return (
        <div className="my-6">
            <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
            <ul className="list-none p-0 m-0 py-4 overflow-x-auto whitespace-nowrap flex flex-row gap-6">
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