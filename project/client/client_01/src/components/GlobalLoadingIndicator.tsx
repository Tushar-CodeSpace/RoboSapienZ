'use client';

import { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export function GlobalLoadingIndicator() {
    const [loading, setLoading] = useState(false);
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        // Show loading indicator when the path or search params change
        setLoading(true);

        // Hide loading indicator after a short delay
        // In a real application, you might tie this to actual data fetching completion
        // or rely more on Next.js's built-in loading.tsx for Suspense boundaries.
        // This global indicator provides a general visual cue.
        const timer = setTimeout(() => {
            setLoading(false);
        }, 750); // Adjust delay as needed

        return () => {
            clearTimeout(timer);
            // It's also good practice to ensure loading is false if the component unmounts
            // or if the effect re-runs before the timer completes.
            setLoading(false);
        };
    }, [pathname, searchParams]); // Re-run effect when path or search params change

    if (!loading) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-[1000]" aria-live="assertive" role="alert">
            <Loader2 className="h-16 w-16 text-accent animate-spin" />
            <span className="sr-only">Loading page...</span>
        </div>
    );
}
