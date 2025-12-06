import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface GiftRevealProps {
    name: string;
    children?: React.ReactNode;
}

const QUOTES = [
    { text: "Feliz Navidad, inmundo animal.", author: "Mi Pobre Angelito" },
    { text: "La mejor manera de difundir la alegría navideña es cantar fuerte para que todos lo escuchen.", author: "Elf" },
    { text: "No es lo que hay bajo el árbol de Navidad lo que importa, es quiénes están a su alrededor.", author: "Charlie Brown" },
    { text: "Tal vez la Navidad, pensó, no viene de una tienda. ¡Tal vez la Navidad... quizás... significa un poco más!", author: "El Grinch" },
    { text: "Ver es creer, pero a veces las cosas más reales del mundo son las que no podemos ver.", author: "El Expreso Polar" },
    { text: "Honra la Navidad en tu corazón y procura conservarla durante todo el año.", author: "Charles Dickens" },
    { text: "La Navidad no es un momento ni una estación, sino un estado de la mente.", author: "Calvin Coolidge" },
    { text: "Ojalá pudiésemos meter el espíritu de Navidad en tarros y abrir uno cada mes del año.", author: "Harlan Miller" },
    { text: "La Navidad agita una varita mágica sobre el mundo, y por eso, todo es más suave y más hermoso.", author: "Norman Vincent Peale" },
    { text: "Recuerda, si no encuentras la Navidad en tu corazón, no podrás encontrarla bajo un árbol.", author: "Charlotte Carpenter" }
];

export function GiftReveal({ name, children }: GiftRevealProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [quote, setQuote] = useState(QUOTES[0]);

    useEffect(() => {
        setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
    }, []);

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
                        className="text-center w-full max-w-2xl px-4"
                    >
                        <div className="text-5xl md:text-8xl font-bold text-center p-6 font-dancing-script text-red-600 drop-shadow-md">
                            {name}
                        </div>

                        <motion.blockquote
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="mb-8 max-w-lg mx-auto bg-white/60 p-6 rounded-xl shadow-sm backdrop-blur-sm"
                        >
                            <p className="text-xl md:text-2xl font-dancing-script text-gray-800 mb-2 leading-relaxed">
                                "{quote.text}"
                            </p>
                            <footer className="text-sm text-gray-600 font-medium uppercase tracking-wider">
                                — {quote.author}
                            </footer>
                        </motion.blockquote>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                        >
                            {children}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
