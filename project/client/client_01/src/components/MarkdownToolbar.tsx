
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
    Bold,
    Italic,
    Heading2,
    Link as LinkIcon,
    Quote,
    Code,
    FileOutput, // Using FileOutput for Code Block as SquareCode is not available
    List,
    ListOrdered,
} from 'lucide-react';

interface MarkdownToolbarProps {
    textareaRef: React.RefObject<HTMLTextAreaElement>;
    setValue: (value: string) => void;
}

export function MarkdownToolbar({ textareaRef, setValue }: MarkdownToolbarProps) {
    const applyMarkdown = (prefix: string, suffix: string = '', defaultText: string = 'text') => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const currentValue = textarea.value;
        const selectedText = currentValue.substring(start, end);

        let newText;
        let newCursorPosition;

        if (selectedText) {
            newText = `${prefix}${selectedText}${suffix}`;
            newCursorPosition = start + newText.length;
        } else {
            newText = `${prefix}${defaultText}${suffix}`;
            newCursorPosition = start + prefix.length + defaultText.length;
        }

        const updatedValue = currentValue.substring(0, start) + newText + currentValue.substring(end);
        textarea.value = updatedValue;
        setValue(updatedValue); // Update react-hook-form state

        // Focus and set cursor position
        textarea.focus();
        // Delay setting cursor position slightly to ensure DOM update
        setTimeout(() => {
            textarea.setSelectionRange(newCursorPosition, newCursorPosition);
        }, 0);
    };

    const applyList = (prefix: string) => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const currentValue = textarea.value;

        // Check if the current line is empty or just whitespace
        let lineStart = start;
        while (lineStart > 0 && currentValue[lineStart - 1] !== '\n') {
            lineStart--;
        }
        const currentLineIsEmpty = currentValue.substring(lineStart, start).trim() === '';

        let textToInsert;
        if (start > 0 && currentValue[start - 1] !== '\n' && !currentLineIsEmpty) {
            textToInsert = `\n${prefix} List item`; // Add newline if not at start of a line
        } else {
            textToInsert = `${prefix} List item`;
        }

        const updatedValue = currentValue.substring(0, start) + textToInsert + currentValue.substring(end);
        textarea.value = updatedValue;
        setValue(updatedValue);

        textarea.focus();
        const newCursorPosition = start + textToInsert.length;
        setTimeout(() => {
            textarea.setSelectionRange(newCursorPosition, newCursorPosition);
        }, 0);
    };

    const applyLink = () => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const currentValue = textarea.value;
        const selectedText = currentValue.substring(start, end);

        const linkText = selectedText || 'link text';
        const linkMarkdown = `[${linkText}](url)`;

        const placeholderUrlPosition = start + linkText.length + 3; // After "[linkText](u"

        const updatedValue = currentValue.substring(0, start) + linkMarkdown + currentValue.substring(end);
        textarea.value = updatedValue;
        setValue(updatedValue);

        textarea.focus();
        setTimeout(() => {
            textarea.setSelectionRange(placeholderUrlPosition, placeholderUrlPosition + 3); // Select "url"
        }, 0);
    };

    const toolbarItems = [
        { label: 'Bold', icon: <Bold className="h-4 w-4" />, action: () => applyMarkdown('**', '**', 'bold text') },
        { label: 'Italic', icon: <Italic className="h-4 w-4" />, action: () => applyMarkdown('*', '*', 'italic text') },
        { label: 'Heading 2', icon: <Heading2 className="h-4 w-4" />, action: () => applyMarkdown('## ', '', 'Heading') },
        { label: 'Link', icon: <LinkIcon className="h-4 w-4" />, action: applyLink },
        { label: 'Blockquote', icon: <Quote className="h-4 w-4" />, action: () => applyMarkdown('> ', '', 'Quote') },
        { label: 'Inline Code', icon: <Code className="h-4 w-4" />, action: () => applyMarkdown('`', '`', 'code') },
        { label: 'Code Block', icon: <FileOutput className="h-4 w-4" />, action: () => applyMarkdown('```\n', '\n```', 'code block') },
        { label: 'Unordered List', icon: <List className="h-4 w-4" />, action: () => applyList('- ') },
        { label: 'Ordered List', icon: <ListOrdered className="h-4 w-4" />, action: () => applyList('1. ') },
    ];

    return (
        <div className="flex flex-wrap gap-1 border border-input p-2 rounded-md bg-card mb-2">
            {toolbarItems.map((item) => (
                <Button
                    key={item.label}
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={item.action}
                    title={item.label}
                    className="h-8 w-8"
                >
                    {item.icon}
                    <span className="sr-only">{item.label}</span>
                </Button>
            ))}
        </div>
    );
}
