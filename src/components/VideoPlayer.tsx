import { useFocusStore } from '../store/useFocusStore';
import { useEffect, useRef } from 'react';

export default function VideoPlayer() {
    const videoRef = useRef<HTMLVideoElement | null>(null);

    const activeVideoUrl = useFocusStore((state) => state.activeVideoUrl);

    useEffect(() => {
        console.log("Video component mounted into DOM. Active URL:", activeVideoUrl);

        // 👇 HARD IMPERATIVE INJECTION: Force the native browser engine to read the source string
        if (videoRef.current && activeVideoUrl) {
            videoRef.current.src = activeVideoUrl;
            videoRef.current.load();
            
            // Some browsers need an explicit play invocation if autoPlay fails
            videoRef.current.play().catch(err => console.log("Autoplay play() promise rejected:", err));
        }

        return () => {
            console.log("Dismantling video player and purging hardware memory...");
            if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.src = '';
                videoRef.current.load(); 
            }
        };
    }, [activeVideoUrl]); // 👈 Make sure activeVideoUrl is in the dependency array!

    if (!activeVideoUrl) {
        return (
            <div className="w-screen h-screen fixed inset-0 bg-black z-50 flex items-center justify-center">
                <p className="text-slate-400 animate-pulse">Initializing Stream Buffer...</p>
            </div>
        );
    }

    return (
        <div className="w-screen h-screen fixed inset-0 bg-black z-50 flex items-center justify-center">
            <video 
                ref={videoRef}
                autoPlay
                playsInline
                controls={false}
                className="w-full h-full object-cover"
                onError={(e) => console.error("HTML5 Video Error Event:", e.currentTarget.error)}
            />
            {/* Visual Indicator overlay for testing */}
            <div className="absolute top-8 left-8 bg-black/60 px-4 py-2 rounded border border-slate-700">
                <p className="text-yellow-400 font-mono text-sm">🔴 LIVE STREAM PLAYING</p>
                <p className="text-xs text-slate-400 mt-1">Press ESC to exit</p>
            </div>
        </div>
    )

}