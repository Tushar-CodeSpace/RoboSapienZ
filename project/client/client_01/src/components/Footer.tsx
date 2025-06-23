
'use client';

import Link from 'next/link';
import { Youtube, Github, Linkedin, Instagram, ShieldCheck, Feather } from 'lucide-react';
import { useEffect, useState } from 'react';

const XLogo = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

const TikTokLogo = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.82-.3-4.12-.75-.01-.01-.01-.02-.02-.03-.01-.02-.02-.03-.02-.05v8.47c0 1.23-.27 2.44-.83 3.54-.54 1.08-1.28 2.02-2.21 2.75a6.197 6.197 0 01-4.73 1.42A6.086 6.086 0 014.2 22.46c-.99-.83-1.74-1.89-2.23-3.09-.49-1.2-.73-2.49-.73-3.79s.19-2.52.6-3.7c.4-.14.8-.28 1.2-.41.04-.01.07-.02.11-.03C2.9 10.01 2.9 8.52 2.9 7.02c0-1.24.36-2.41 1.03-3.44.67-1.03 1.59-1.84 2.69-2.42.6-.33 1.24-.56 1.89-.7.29-.06.59-.11.89-.15.04 1.55.58 3.08 1.69 4.16 1.11 1.08 2.66 1.59 4.19 1.78V.02zM11.18 13.55v8.46c0 .64-.09 1.27-.28 1.87-.19.6-.47 1.17-.84 1.68-.37.51-.83.93-1.36 1.25-.53.32-1.1.53-1.71.63-.61.1-1.22.09-1.82-.02-.59-.11-1.17-.31-1.71-.6-.54-.28-1.02-.65-1.44-1.08-.42-.43-.77-.93-1.04-1.46-.28-.53-.47-1.1-.57-1.69-.1-.59-.15-1.18-.15-1.78 0-.13.02-.27.05-.41.09-.33.07-.67.07-1v-3.08c.02-.31.06-.62.12-.92.15-1.02.52-1.98 1.09-2.85.57-.87 1.32-1.62 2.2-2.2.52-.34 1.08-.6 1.67-.77.02-.01.03-.01.05-.02v4.41c-.01.01-.01.01-.01.02z" />
    </svg>
);

const socialLinks = [
    { href: "#", icon: <Youtube className="h-5 w-5" />, label: "YouTube" },
    { href: "#", icon: <XLogo />, label: "X" },
    { href: "#", icon: <Github className="h-5 w-5" />, label: "GitHub" },
    { href: "#", icon: <Linkedin className="h-5 w-5" />, label: "LinkedIn" },
    { href: "#", icon: <TikTokLogo />, label: "TikTok" },
    { href: "#", icon: <Instagram className="h-5 w-5" />, label: "Instagram" },
    { href: "#", icon: <Feather className="h-5 w-5" />, label: "Our Platform" }
];

const footerUtilityLinks = [
    { href: "#", label: "Contact Us" },
    { href: "#", label: "Support" },
    { href: "#", label: "Privacy & Cookies" },
    { href: "#", label: "Terms of Use" },
    { href: "#", label: "Trademarks" },
];

export function Footer() {
    const currentYear = new Date().getFullYear();
    const [mounted, setMounted] = useState(false);

    useEffect(() => { setMounted(true); }, []);

    if (!mounted) { return null; }

    return (
        <footer className="bg-background text-muted-foreground border-t border-border">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center">
                    <span className="text-sm font-semibold text-foreground mb-3 sm:mb-0 flex-shrink-0">Follow us</span>
                    <div className="flex flex-wrap gap-x-4 gap-y-3 sm:ml-4">
                        {socialLinks.map(link => (
                            <Link
                                key={link.label}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={link.label}
                                className="text-foreground hover:text-accent transition-colors"
                            >
                                {link.icon}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* This section was empty and has been removed to reduce space */}

                <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-2 pt-4 border-t border-border/50">
                    <p className="text-xs text-muted-foreground/80 text-center md:text-left">
                        © {currentYear} RoboSapienZ. All rights reserved.
                    </p>
                    <nav className="flex flex-wrap gap-x-3 gap-y-1 justify-center md:justify-end">
                        {footerUtilityLinks.map(link => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="text-xs text-muted-foreground hover:text-accent transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </footer>
    );
}
