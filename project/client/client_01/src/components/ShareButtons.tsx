'use client';

import { useEffect, useState } from 'react';
import { Twitter, Facebook, Linkedin, Link as LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";

interface ShareButtonsProps {
    title: string;
    className?: string;
}

export function ShareButtons({ title, className }: ShareButtonsProps) {
    const [currentUrl, setCurrentUrl] = useState('');
    const { toast } = useToast();

    useEffect(() => {
        setCurrentUrl(window.location.href);
    }, []);

    if (!currentUrl) {
        return null;
    }

    const encodedUrl = encodeURIComponent(currentUrl);
    const encodedTitle = encodeURIComponent(title);

    const platforms = [
        {
            name: 'Twitter',
            icon: <Twitter />,
            url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
        },
        {
            name: 'Facebook',
            icon: <Facebook />,
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        },
        {
            name: 'LinkedIn',
            icon: <Linkedin />,
            url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
        },
    ];

    const copyToClipboard = () => {
        navigator.clipboard.writeText(currentUrl)
            .then(() => {
                toast({ title: "Copied to clipboard!", description: "Article URL copied successfully." });
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
                toast({ variant: "destructive", title: "Copy failed", description: "Could not copy URL to clipboard." });
            });
    };

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <span className="text-sm font-medium text-foreground mr-2">Share:</span>
            {platforms.map((platform) => (
                <Button
                    key={platform.name}
                    variant="outline"
                    size="icon"
                    asChild
                    aria-label={`Share on ${platform.name}`}
                >
                    <a href={platform.url} target="_blank" rel="noopener noreferrer">
                        {platform.icon}
                    </a>
                </Button>
            ))}
            <Button variant="outline" size="icon" onClick={copyToClipboard} aria-label="Copy link">
                <LinkIcon />
            </Button>
        </div>
    );
}
