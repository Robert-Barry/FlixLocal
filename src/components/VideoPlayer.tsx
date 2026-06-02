import { useFocusStore } from '../store/useFocusStore';
import { useState, useEffect, useRef } from 'react';

export default function VideoPlayer() {
    const videoRef = useRef<HTMLVideoElement | null>(null);

    const activeVideoUrl = useFocusStore((state) => state.activeVideoUrl);

    useEffect(() => {
        const handleKeyEvent = (event: KeyboardEvent) => {
            if (event.key === ' ') {
                event.preventDefault();

                if (videoRef.current) {
                    if (videoRef.current.paused) {
                        videoRef.current.play();
                    } else {
                        videoRef.current.pause();
                    }
                }
            }
        }
        window.addEventListener('keydown', handleKeyEvent);

        return () => {
            window.removeEventListener('keydown', handleKeyEvent);
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
            <div className="absolute bottom-12 left-12 right-12 bg-black/80 p-6 rounded-xl flex flex-col gap-3">
                <span id="video-time" className="font-mono text-sm text-slate-300">00:00 / 00:00</span>
                <div id="progress-track" className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                <div 
                    id="video-progress" 
                    className="h-full bg-yellow-400 w-0 transition-all duration-100 ease-out" 
                />
            </div>
            </div>
        </div>
    )

}