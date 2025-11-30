"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


function Typewriter({
    text,
    speed = 55, 
    pause = 600,
}: { text: string; speed?: number; pause?: number }) {
    const [out, setOut] = useState("");
    const [del, setDel] = useState(false);

    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const step = () => {
            if (!del) {
                const next = text.slice(0, out.length + 1);
                setOut(next);
                if (next === text) {
                    setDel(true);
                    timer.current = setTimeout(step, pause);
                    return;
                }
            } else {
                const next = text.slice(0, out.length - 1);
                setOut(next);
                if (next.length === 0) setDel(false);
            }
            timer.current = setTimeout(step, del ? Math.max(30, speed - 15) : speed);
        };

        timer.current = setTimeout(step, speed);

       
        return () => {
            if (timer.current) {
                clearTimeout(timer.current);
                timer.current = null;
            }
        };
    }, [out, del, text, speed, pause]);

    return (
        <span className="relative">
            <span>{out}</span>
            <span className="ml-0.5 inline-block w-0.5 h-5 align-middle bg-gray-900 animate-pulse" />
        </span>
    );
}

export default function Preloader({
    onDone,
    minDuration = 1200,
}: {
    onDone: () => void;
   
    minDuration?: number;
}) {
    const [progress, setProgress] = useState(0);
    const start = useRef<number | null>(null);

    const prefersReduced = useMemo(
        () =>
            typeof window !== "undefined" &&
            window.matchMedia &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches,
        []
    );

    useEffect(() => {
       
        const tick = (t: number) => {
            if (start.current == null) start.current = t;
            const elapsed = t - start.current;
            const pct = Math.min(100, (elapsed / minDuration) * 100);
            setProgress(pct);
            if (pct < 100) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }, [minDuration]);

    useEffect(() => {
       
        let loaded = false;
        const done = () => {
            if (loaded) return;
            loaded = true;
            
            setTimeout(onDone, 180);
        };

        if (document.readyState === "complete") {
            
            const id = setTimeout(done, Math.max(0, minDuration - 200));
            return () => clearTimeout(id);
        } else {
            window.addEventListener("load", done, { once: true });
            return () => window.removeEventListener("load", done);
        }
    }, [onDone, minDuration]);

    return (
        <div
            role="status"
            aria-busy="true"
            className="fixed inset-0 z-[9999] bg-white/95 backdrop-blur-sm grid place-items-center"
        >
            <div className="w-[90%] max-w-sm">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-200">
                        <Avatar className="w-12 h-12 rounded-none">
                            <AvatarImage
                                src="https://github.com/evilrabbit.png"
                                alt="Avatar"
                                className="w-full h-full object-cover"
                            />
                            <AvatarFallback className="bg-foreground text-white font-bold">
                                RZ
                            </AvatarFallback>
                        </Avatar>
                    </div>
                    <div className="leading-tight">
                        <p className="text-sm text-gray-500">Preparing interface</p>
                        {prefersReduced ? (
                            <p className="text-lg font-semibold text-gray-900">
                                Ridhwan Zakki
                            </p>
                        ) : (
                            <p className="text-lg font-semibold text-gray-900">
                                <Typewriter text="Ridhwan Zakki" />
                            </p>
                        )}
                    </div>
                </div>

               
                <div className="mt-4 h-2 w-full rounded-lg bg-gray-100 overflow-hidden">
                    <div
                        className="h-full rounded-lg bg-gray-900 transition-[width] duration-150"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <div className="mt-2 flex items-center justify-between text-[11px] text-gray-500">
                    <span>loading components…</span>
                    <span>{Math.round(progress)}%</span>
                </div>

                
                <button
                    className="mt-4 text-xs px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-900 hover:text-white transition-colors"
                    onClick={onDone}
                >
                    Skip
                </button>
            </div>
        </div>
    );
}
