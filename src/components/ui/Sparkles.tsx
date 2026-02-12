'use client';

import { useEffect, useState } from 'react';

interface Sparkle {
    id: string;
    createdAt: number;
    color: string;
    size: number;
    style: {
        top: string;
        left: string;
        zIndex: number;
    };
}

const DEFAULT_COLOR = '#D4AF37'; // Gold
const SPARKLE_LIFETIME = 1500; // ms

const SparklesRaw = ({ color = DEFAULT_COLOR, size = 15, style }: { color?: string; size?: number; style: React.CSSProperties }) => {
    return (
        <span style={style} className="absolute pointer-events-none block animate-sparkle">
            <svg
                width={size}
                height={size}
                viewBox="0 0 160 160"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M80 0C80 0 84.2846 41.2925 101.496 58.504C118.707 75.7154 160 80 160 80C160 80 118.707 84.2846 101.496 101.496C84.2846 118.707 80 160 80 160C80 160 75.7154 118.707 58.504 101.496C41.2925 84.2846 0 80 0 80C0 80 41.2925 75.7154 58.504 58.504C75.7154 41.2925 80 0 80 0Z"
                    fill={color}
                />
            </svg>
        </span>
    );
};

// Hook for generating random numbers
const random = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;

const Sparkles = ({ color = DEFAULT_COLOR, minSize = 10, maxSize = 20, count = 20, className = "" }: { color?: string; minSize?: number; maxSize?: number; count?: number; className?: string }) => {
    const [sparkles, setSparkles] = useState<Sparkle[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = Date.now();
            // Clean up old sparkles
            const nextSparkles = sparkles.filter((sp) => now - sp.createdAt < SPARKLE_LIFETIME);

            // Add new sparkle if needed
            if (nextSparkles.length < count) {
                nextSparkles.push({
                    id: String(random(10000, 99999)),
                    createdAt: now,
                    color,
                    size: random(minSize, maxSize),
                    style: {
                        top: random(0, 100) + '%',
                        left: random(0, 100) + '%',
                        zIndex: 2,
                    },
                });
            }
            setSparkles(nextSparkles);
        }, 100);

        return () => clearInterval(interval);
    }, [color, minSize, maxSize, count, sparkles]);

    return (
        <span className={`absolute inset-0 block pointer-events-none overflow-hidden ${className}`}>
            {sparkles.map((sparkle) => (
                <SparklesRaw
                    key={sparkle.id}
                    color={sparkle.color}
                    size={sparkle.size}
                    style={sparkle.style}
                />
            ))}
        </span>
    );
};

export default Sparkles;
