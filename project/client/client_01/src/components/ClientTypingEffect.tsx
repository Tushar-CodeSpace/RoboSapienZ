
'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface LastCharBlinkerProps {
    char: string;
    baseColor?: string;
    invertedColor?: string;
}

const LastCharBlinker: React.FC<LastCharBlinkerProps> = ({
    char,
    baseColor = 'currentColor',
    invertedColor = 'black',
}) => {
    const [isBlockVisible, setIsBlockVisible] = useState(true);

    useEffect(() => {
        const timer = setInterval(() => {
            setIsBlockVisible(prev => !prev);
        }, 500); // Blink rate: 500ms on, 500ms off
        return () => clearInterval(timer);
    }, []);

    return (
        <span style={{
            position: 'relative',
            display: 'inline-block',
            fontFamily: 'inherit',
            lineHeight: 'inherit',
            verticalAlign: 'bottom', // Helps align with previous text
            minWidth: '0.5em', // Ensure some space for the char
        }}>
            {/* Normal char, shown when block is off */}
            <span style={{
                opacity: isBlockVisible ? 0 : 1,
                color: baseColor,
            }}>
                {char}
            </span>
            {/* Block with inverted char, shown when block is on */}
            <span style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: '100%',
                height: '100%',
                backgroundColor: baseColor, // Block background uses normal text color
                color: invertedColor,       // Char inside block is inverted
                opacity: isBlockVisible ? 1 : 0,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                userSelect: 'none',
                paddingLeft: '0.05em', // Minor adjustments might be needed per font
                paddingRight: '0.05em',
            }}>
                {char}
            </span>
        </span>
    );
};


interface TypingEffectProps {
    text: string;
    typingSpeed?: number;
    className?: string;
    onComplete?: () => void;
    showCursor?: boolean;
    isLastSegment?: boolean;
    lastCharSpecialBlink?: boolean;
    baseColor?: string;
    invertedCharColor?: string;
}

const ClientTypingEffect: React.FC<TypingEffectProps> = ({
    text,
    typingSpeed = 75,
    className,
    onComplete,
    showCursor: showCursorProp = true, // Renamed to avoid conflict
    isLastSegment: isLastSegmentProp = false, // Renamed
    lastCharSpecialBlink = false,
    baseColor,
    invertedCharColor,
}) => {
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);
    const [processingSpecialBlink, setProcessingSpecialBlink] = useState(false);

    useEffect(() => {
        if (processingSpecialBlink) return; // Handed off to LastCharBlinker

        if (currentIndex < text.length) {
            setIsCompleted(false); // Reset if text changes or re-types

            if (lastCharSpecialBlink && isLastSegmentProp && currentIndex === text.length - 1) {
                // This is the last character of a special blink segment
                // Type all but the last character normally. The last char is handled by LastCharBlinker.
                setDisplayedText(text.substring(0, text.length - 1));
                setProcessingSpecialBlink(true);
                setCurrentIndex(text.length); // Mark as "done" with typing sequence
                setIsCompleted(true); // Mark as completed
                onComplete?.(); // Signal completion to parent
                return;
            }

            const timeoutId = setTimeout(() => {
                setDisplayedText((prev) => prev + text[currentIndex]);
                setCurrentIndex((prev) => prev + 1);
            }, typingSpeed);
            return () => clearTimeout(timeoutId);
        } else if (currentIndex >= text.length && !isCompleted) {
            setIsCompleted(true);
            onComplete?.();
        }
    }, [
        currentIndex,
        text,
        typingSpeed,
        onComplete,
        isCompleted,
        displayedText, // Keep displayedText here if progressive typing of all but last char
        lastCharSpecialBlink,
        isLastSegmentProp,
        processingSpecialBlink
    ]);

    // Determine if the standard block cursor '█' should be displayed
    const shouldDisplayRegularCursor = !processingSpecialBlink &&
        ((showCursorProp && !isCompleted) || (isLastSegmentProp && isCompleted && showCursorProp && !lastCharSpecialBlink));

    return (
        <span className={cn(className)}>
            {displayedText}
            {processingSpecialBlink && lastCharSpecialBlink && isLastSegmentProp ? (
                <LastCharBlinker
                    char={text[text.length - 1]} // The actual last character from the text prop
                    baseColor={baseColor}
                    invertedColor={invertedCharColor}
                />
            ) : (
                shouldDisplayRegularCursor && <span className="blinking-cursor" aria-hidden="true">█</span>
            )}
        </span>
    );
};

export default ClientTypingEffect;
