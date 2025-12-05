import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface GiftRevealProps {
    name: string;
    children?: React.ReactNode;
}

export function GiftReveal({ name, children }: GiftRevealProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        if (isOpen) return;
        setIsOpen(true);

        // Fire confetti
        const duration = 3000;
        const end = Date.now() + duration;

        const frame = () => {
            confetti({
                particleCount: 2,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#EF4444', '#10B981', '#FBBF24'] // Red, Green, Gold
            });
            confetti({
                particleCount: 2,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#EF4444', '#10B981', '#FBBF24']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        };
        frame();
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[300px]">
            <AnimatePresence mode="wait">
                {!isOpen ? (
                    <motion.div
                        key="gift"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.1, rotate: [0, -5, 5, -5, 5, 0] }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleOpen}
                        className="cursor-pointer flex flex-col items-center gap-4"
                    >
                        <div className="relative">
                            <div className="text-[150px] leading-none filter drop-shadow-lg transform hover:scale-110 transition-transform cursor-pointer">
                                🎅
                            </div>
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-red-600 px-4 py-1 rounded-full text-sm font-bold whitespace-nowrap shadow-md border-2 border-red-100"
                            >
                                ¡Jo Jo Jo!
                            </motion.div>
                        </div>
                        <p className="text-xl font-bold text-gray-600 animate-pulse text-center">
                            Toca a Papá Noel para conocer a tu amigo invisible
                        </p>
                    </motion.div>
                ) : (
                    <motion.div
                        key="revealed"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", bounce: 0.5 }}
                        className="text-center"
                    >
                        <div className="text-5xl md:text-8xl font-bold text-center p-6 font-dancing-script text-red-600 drop-shadow-md">
                            {name}
                        </div>
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
