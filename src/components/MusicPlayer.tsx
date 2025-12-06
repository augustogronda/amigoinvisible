import { useEffect, useRef, useState } from 'react';
import { SpeakerHigh, SpeakerSlash } from '@phosphor-icons/react';
import { useLocation } from 'react-router-dom';

export function MusicPlayer() {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const location = useLocation();

    // Only allow playback on the /pairing route
    const shouldPlay = location.pathname === '/pairing';

    useEffect(() => {
        if (!shouldPlay) {
            if (audioRef.current) {
                audioRef.current.pause();
                setIsPlaying(false);
            }
            return;
        }

        // Try to play automatically
        const playAudio = async () => {
            if (audioRef.current) {
                try {
                    await audioRef.current.play();
                    setIsPlaying(true);
                } catch (err) {
                    console.log("Autoplay blocked, waiting for interaction");
                    setIsPlaying(false);
                }
            }
        };

        playAudio();

        // Add global listeners to start audio on any interaction
        const handleInteraction = () => {
            if (!hasInteracted && audioRef.current && audioRef.current.paused) {
                audioRef.current.play().then(() => {
                    setIsPlaying(true);
                    setHasInteracted(true);
                }).catch(console.error);
            }
        };

        // Handle visibility change (pause when minimized/background)
        const handleVisibilityChange = () => {
            if (document.hidden) {
                if (audioRef.current && !audioRef.current.paused) {
                    audioRef.current.pause();
                    setIsPlaying(false);
                }
            } else {
                // Only resume if we have interacted before or it was playing
                if (audioRef.current && hasInteracted) {
                    audioRef.current.play().catch(console.error);
                    setIsPlaying(true);
                }
            }
        };

        window.addEventListener('click', handleInteraction);
        window.addEventListener('touchstart', handleInteraction);
        window.addEventListener('keydown', handleInteraction);
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            window.removeEventListener('click', handleInteraction);
            window.removeEventListener('touchstart', handleInteraction);
            window.removeEventListener('keydown', handleInteraction);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [hasInteracted, shouldPlay]);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    // Construct path using Vite's BASE_URL to ensure it works in subdirectories
    const audioSrc = `${import.meta.env.BASE_URL}static/song.mp3`;

    if (!shouldPlay) return null;

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <audio ref={audioRef} src={audioSrc} loop />
            <button
                onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the global interaction handler
                    togglePlay();
                }}
                className="bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition-colors flex items-center justify-center"
                title={isPlaying ? "Silenciar música" : "Reproducir música"}
            >
                {isPlaying ? <SpeakerHigh size={24} weight="fill" /> : <SpeakerSlash size={24} weight="fill" />}
            </button>
        </div>
    );
}
