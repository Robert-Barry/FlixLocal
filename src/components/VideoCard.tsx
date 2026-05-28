import { useFocusStore } from '../store/useFocusStore'

interface VideoCardProps {
    rowIndex: number;
    colIndex: number;
    title: string;
}

export default  function VideoCard({ rowIndex, colIndex, title }: VideoCardProps) {
    const isFocused = useFocusStore(
        (state) => state.activeRow === rowIndex && state.activeColumn === colIndex
    );

    return (
        <div className="flex flex-col w-64 mb-2">
            <div className={`w-full aspect-video bg-slate-800 rounded-lg flex 
                            justify-center tems-center justify-center border-4 
                            transition-all duration-200 ease-out transform
                            ${isFocused 
                                ? 'border-yellow-400 scale-105 shadow-2xl' 
                                : 'border-transparent scale-100 opacity-60'

                            }`}>
                <span className="text-slate-400 font-bold text-xs tracking-wider uppercase">
                    {isFocused ? '▶ Play' : 'Video'}
                </span>
            </div>
            <h2 className={`mt-2 text-sm transition-colors duration-200 ${
                isFocused ? 'text-yellow-400 font-bold' : 'text-slate-300 font-medium'}`}
            >
                {title}
            </h2>
        </div>
    );
}