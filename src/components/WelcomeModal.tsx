import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkle } from '@phosphor-icons/react';

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

export function WelcomeModal() {
    const [isOpen, setIsOpen] = useState(true);
    const [quote, setQuote] = useState(QUOTES[0]);

    useEffect(() => {
        // Select random quote on mount
        setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
    }, []);

    const handleEnter = () => {
        setIsOpen(false);
        // The click event will bubble up and trigger the MusicPlayer's global listener
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="bg-white max-w-lg w-full rounded-2xl p-8 shadow-2xl text-center relative overflow-hidden"
                    >
                        {/* Decorative background elements */}
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 via-green-500 to-red-500" />
                        <div className="absolute -top-10 -right-10 text-yellow-100 opacity-50">
                            <Sparkle size={150} weight="fill" />
                        </div>

                        <div className="relative z-10">
                            <div className="mb-6 text-red-600 flex justify-center">
                                <Sparkle size={48} weight="fill" />
                            </div>

                            <blockquote className="mb-6">
                                <p className="text-2xl md:text-3xl font-dancing-script text-gray-800 mb-4 leading-relaxed">
                                    "{quote.text}"
                                </p>
                                <footer className="text-sm text-gray-500 font-medium uppercase tracking-wider">
                                    — {quote.author}
                                </footer>
                            </blockquote>

                            <button
                                onClick={handleEnter}
                                className="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-bold text-white transition-all duration-200 bg-red-600 rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600 hover:scale-105"
                            >
                                <span>Entrar</span>
                                <Sparkle className="ml-2 animate-pulse" size={20} weight="fill" />
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
