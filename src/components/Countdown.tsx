import { useState, useEffect } from 'react';
import "@fontsource/dancing-script/700.css";

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export function Countdown() {
    const calculateTimeLeft = (): TimeLeft => {
        const year = new Date().getFullYear();
        const christmas = new Date(year, 11, 25); // Month is 0-indexed, so 11 is December
        const now = new Date();

        // If Christmas has passed this year, count down to next year's
        if (now > christmas) {
            christmas.setFullYear(year + 1);
        }

        const difference = +christmas - +now;

        let timeLeft: TimeLeft = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        };

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center p-4 text-gray-800 drop-shadow-md bg-white/50 rounded-lg mb-4">
            <h3 className="text-2xl md:text-3xl font-dancing-script mb-2 text-red-600 bg-white/80 px-4 py-1 rounded-full shadow-sm">
                Faltan para Navidad:
            </h3>
            <div className="flex gap-4 text-center">
                <div className="flex flex-col items-center">
                    <span className="text-3xl md:text-4xl font-bold font-dancing-script text-red-700 bg-white/90 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center shadow-lg border-2 border-green-500">
                        {timeLeft.days}
                    </span>
                    <span className="text-sm font-bold text-green-800 mt-1 bg-white/80 px-2 rounded">Días</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-3xl md:text-4xl font-bold font-dancing-script text-red-700 bg-white/90 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center shadow-lg border-2 border-green-500">
                        {timeLeft.hours}
                    </span>
                    <span className="text-sm font-bold text-green-800 mt-1 bg-white/80 px-2 rounded">Hs</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-3xl md:text-4xl font-bold font-dancing-script text-red-700 bg-white/90 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center shadow-lg border-2 border-green-500">
                        {timeLeft.minutes}
                    </span>
                    <span className="text-sm font-bold text-green-800 mt-1 bg-white/80 px-2 rounded">Min</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-3xl md:text-4xl font-bold font-dancing-script text-red-700 bg-white/90 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center shadow-lg border-2 border-green-500">
                        {timeLeft.seconds}
                    </span>
                    <span className="text-sm font-bold text-green-800 mt-1 bg-white/80 px-2 rounded">Seg</span>
                </div>
            </div>
        </div>
    );
}
