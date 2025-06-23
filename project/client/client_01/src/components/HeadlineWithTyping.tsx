
'use client';

import { useState, useEffect } from 'react';
import ClientTypingEffect from './ClientTypingEffect';

const HeadlineWithTyping = () => {
    // State for each part of the animated segment
    const [isReadyToType, setIsReadyToType] = useState(false);
    const [roboticsDone, setRoboticsDone] = useState(false);
    const [ampersandDone, setAmpersandDone] = useState(false);
    const [aiDone, setAiDone] = useState(false);
    // The last part " Driven" will use the special blink effect

    const typingSpeed = 75;

    const minHeightDesktop = "180px";
    const minHeightMobile = "150px";

    useEffect(() => {
        // Delay starting the typing effect to allow the global loading indicator to finish
        // GlobalLoadingIndicator hides after 750ms, so we wait a bit longer.
        const timer = setTimeout(() => {
            setIsReadyToType(true);
        }, 800); // Start typing after 800ms

        return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
    }, []);


    return (
        <h1
            className="text-5xl sm:text-6xl md:text-6xl lg:text-7xl font-headline"
            style={{ minHeight: `var(--min-headline-height, ${minHeightMobile})` }}
        >
            <style jsx global>{`
        @media (min-width: 1024px) { /* Corresponds to lg breakpoint */
          :root {
            --min-headline-height: ${minHeightDesktop};
          }
        }
      `}</style>
            {/* Static Part */}
            <span className="relative inline-block">
                Automating
            </span>
            {' the Future.'}
            <br />

            {/* Animated Part Starts Here */}
            <span className="block text-3xl sm:text-4xl md:text-4xl lg:text-5xl leading-none mt-2">
                {isReadyToType ? (
                    <>
                        <ClientTypingEffect
                            text="Robotics"
                            typingSpeed={typingSpeed}
                            className="text-accent"
                            onComplete={() => setRoboticsDone(true)}
                            showCursor={!roboticsDone && !ampersandDone && !aiDone} // Show cursor only if this is the active typing segment
                            baseColor="hsl(var(--accent))"
                            invertedCharColor="black"
                        />

                        {roboticsDone && (
                            <ClientTypingEffect
                                text=" & "
                                typingSpeed={typingSpeed}
                                onComplete={() => setAmpersandDone(true)}
                                showCursor={!ampersandDone && !aiDone} // Show cursor only if this is the active typing segment
                                baseColor="hsl(var(--foreground))"
                                invertedCharColor="black"
                            />
                        )}

                        {ampersandDone && (
                            <ClientTypingEffect
                                text="AI"
                                typingSpeed={typingSpeed}
                                className="text-accent"
                                onComplete={() => setAiDone(true)}
                                showCursor={!aiDone} // Show cursor only if this is the active typing segment
                                baseColor="hsl(var(--accent))"
                                invertedCharColor="black"
                            />
                        )}

                        {aiDone && (
                            <ClientTypingEffect
                                text=" Driven" // Period removed, 'n' is last char handled by special blink
                                typingSpeed={typingSpeed}
                                isLastSegment={true}
                                showCursor={false} // Special blinker is the cursor
                                lastCharSpecialBlink={true}
                                baseColor="hsl(var(--foreground))"
                                invertedCharColor="black"
                            // onComplete is not strictly needed here as it's the very end
                            />
                        )}
                    </>
                ) : (
                    <>&nbsp;</> // Render a non-breaking space while waiting to type to maintain layout
                )}
            </span>
        </h1>
    );
};

export default HeadlineWithTyping;
