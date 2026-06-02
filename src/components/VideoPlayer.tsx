import { useFocusStore } from '../store/useFocusStore';
import { useState, useEffect, useRef } from 'react';

export default function VideoPlayer() {
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const [isHudVisible, setIsHudVisibile] = useState<boolean>(true);

    const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);

    const activeVideoUrl = useFocusStore((state) => state.activeVideoUrl);

    const showHudWithTimeout = () => {
        // Make the HUD visible
        setIsHudVisibile(true);

        // Clearn any existing ticking countdown timer
        if (hideTimerRef.current) {
            clearTimeout(hideTimerRef.current);
        }

        // Schedule a new countdown to hide the HUD
        hideTimerRef.current = setTimeout(() => {
            setIsHudVisibile(false);
        }, 5000);
    };

    // Detect keyboard actions that affect the video playback
    useEffect(() => {
        hideTimerRef.current = setTimeout(() => {
            setIsHudVisibile(false);
        }, 5000);

        const handleKeyEvent = (event: KeyboardEvent) => {
            showHudWithTimeout();

            if (event.key === ' ') {
                event.preventDefault();

                if (videoRef.current) {
                    if (videoRef.current.paused) {
                        videoRef.current.play();
                        setIsPaused(false);
                    } else {
                        videoRef.current.pause();
                        setIsPaused(true);
                    }
                }
            }
        }
        window.addEventListener('keydown', handleKeyEvent);

        return () => {
            window.removeEventListener('keydown', handleKeyEvent);

            // Wipeout the timer on unmount
            if (hideTimerRef.current) {
                clearTimeout(hideTimerRef.current);;
            }
        }
    }, [])

    useEffect(() => {
        console.log("Video component mounted into DOM. Active URL:", activeVideoUrl);

        // 👇 HARD IMPERATIVE INJECTION: Force the native browser engine to read the source string
        if (videoRef.current && activeVideoUrl) {
            videoRef.current.src = activeVideoUrl;
            videoRef.current.load();
            
            // Some browsers need an explicit play invocation if autoPlay fails
            videoRef.current.play().catch(err => console.log("Autoplay play() promise rejected:", err));
        }

        if (videoRef.current) {
            videoRef.current.ontimeupdate = () => {
                const video = videoRef.current;

                if (!video) return;

                // Calculate percentage
                const progressPercent = (video.currentTime / video.duration) * 100;

                // Get elements by ID to bypass React's render engine
                const progressBar = document.getElementById('video-progress');
                const timeText = document.getElementById('video-time');

                if (progressBar) progressBar.style.width = `${progressPercent}%`;
                if (timeText) {
                    const current = Math.floor(video.currentTime);
                    const total = Math.floor(video.duration);
                    timeText.innerText = `${current}s / ${total}s`;
                }
            };
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
            {/* Heads Up Display */}
            {/* 🎬 DYNAMIC HEADS UP DISPLAY WITH AUTO-HIDE TRANSITION */}
        <div 
            className={`absolute bottom-12 left-12 right-12 bg-black/80 p-6 rounded-xl flex flex-col gap-3 z-50 transition-opacity duration-700 ease-in-out ${
                isHudVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {/* 🕹️ PREMIUM STATE-DRIVEN PLAY BUTTON */}
                    <button 
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-400 text-slate-900 font-bold focus:outline-none transition-transform active:scale-95"
                        onClick={() => {
                            if (videoRef.current?.paused) videoRef.current.play();
                            else videoRef.current?.pause();
                        }}
                    >
                        {isPaused ? "▶" : "⏸"}
                    </button>
                    <span id="video-time" className="font-mono text-sm text-slate-300">0s / 0s</span>
                </div>
                
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                    {isPaused ? "⏸️ PAUSED" : "▶️ LIVE STREAM"}
                </span>
            </div>

            <div id="progress-track" className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                <div 
                    id="video-progress" 
                    className="h-full bg-yellow-400 w-0 transition-all duration-100 ease-out" 
                />
                </div>
            </div>
        </div>
    );
}