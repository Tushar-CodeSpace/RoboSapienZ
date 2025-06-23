
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bot, Home as HomeIcon, Newspaper, Info, Users, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

type HeaderStyleState = 'top' | 'blurry' | 'solidScrolled';

export function Header() {
    const [headerStyleState, setHeaderStyleState] = useState<HeaderStyleState>('top');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const topThreshold = 50;
            const solidScrolledThreshold = 300;

            if (scrollY <= topThreshold) {
                setHeaderStyleState('top');
            } else if (scrollY > topThreshold && scrollY <= solidScrolledThreshold) {
                setHeaderStyleState('blurry');
            } else {
                setHeaderStyleState('solidScrolled');
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const navLinks = [
        { href: "/", label: "Home", icon: <HomeIcon className="h-4 w-4" /> },
        { href: "/blog", label: "Blog", icon: <Newspaper className="h-4 w-4" /> },
        { href: "/about", label: "About Us", icon: <Info className="h-4 w-4" /> },
        { href: "/community", label: "Community", icon: <Users className="h-4 w-4" /> },
    ];

    const isAdminPage = pathname.startsWith('/admin');
    const accountButtonText = isAdminPage ? 'My Account' : 'Login';
    const accountButtonHref = isAdminPage ? '/admin' : '/login';

    if (!mounted) {
        // Skeleton header for SSR or before client mount, to minimize layout shift
        return (
            <header
                className={cn(
                    "text-foreground sticky top-0 z-50 transition-colors duration-300 ease-in-out",
                    'bg-background'
                )}
            >
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center gap-2 text-2xl font-headline font-bold text-foreground hover:text-accent transition-colors">
                            <Bot className="h-8 w-8 text-accent" />
                            RoboSapienZ
                        </Link>
                    </div>
                    {/* Placeholder for nav links to maintain spacing */}
                    <div className="hidden md:flex flex-grow justify-center space-x-2 lg:space-x-4 items-center">
                        {navLinks.map(link => (
                            <div key={link.label} className="h-8 w-20 bg-transparent"></div> // Adjust width as needed
                        ))}
                    </div>
                    <Button
                        asChild
                        className="hidden md:inline-flex bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-md ml-2 hover:scale-105 transform transition-all"
                        style={{ opacity: 0.5 }} // Indicate loading/inactive state
                    >
                        <Link href={accountButtonHref}>{accountButtonText}</Link>
                    </Button>
                    <div className="md:hidden">
                        <Button variant="ghost" size="icon" className="text-foreground hover:text-foreground" style={{ opacity: 0.5 }}>
                            <Menu className="h-6 w-6" />
                        </Button>
                    </div>
                </div>
            </header>
        );
    }

    return (
        <header
            className={cn(
                "text-foreground sticky top-0 z-50 transition-colors duration-300 ease-in-out",
                {
                    'bg-background': headerStyleState === 'top' || headerStyleState === 'solidScrolled',
                    'bg-background/80 backdrop-blur-lg': headerStyleState === 'blurry',
                }
            )}
        >
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="flex items-center">
                    <Link href="/" className="flex items-center gap-2 text-2xl font-headline font-bold text-foreground hover:text-accent transition-colors">
                        <Bot className="h-8 w-8 text-accent" />
                        RoboSapienZ
                    </Link>
                </div>

                <nav className="hidden md:flex flex-grow justify-center space-x-2 lg:space-x-4 items-center">
                    {navLinks.map(link => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className="flex items-center gap-1 text-muted-foreground hover:text-accent px-3 py-2 rounded-md text-sm font-medium transform hover:scale-105 transition-all duration-200 ease-in-out"
                        >
                            {React.cloneElement(link.icon, { className: "h-4 w-4" })}
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <Button
                    asChild
                    className="hidden md:inline-flex bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-md ml-2 hover:scale-105 transform transition-all"
                >
                    <Link href={accountButtonHref}>{accountButtonText}</Link>
                </Button>

                <div className="md:hidden">
                    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-foreground hover:text-foreground">
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Open menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="bg-background text-foreground w-[280px] sm:w-[320px] border-r border-border p-0 flex flex-col">
                            <SheetHeader className="p-4 border-b border-border">
                                <div className="flex justify-between items-center">
                                    <SheetTitle>
                                        <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 text-xl font-headline text-foreground">
                                            <Bot className="h-7 w-7 text-accent" /> RoboSapienZ
                                        </Link>
                                    </SheetTitle>
                                    <SheetClose asChild>
                                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                                            <X className="h-5 w-5" />
                                            <span className="sr-only">Close menu</span>
                                        </Button>
                                    </SheetClose>
                                </div>
                            </SheetHeader>
                            <nav className="flex flex-col space-y-1 p-4 flex-grow">
                                {navLinks.map(link => (
                                    <Link
                                        key={link.label}
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="flex items-center gap-3 text-base py-3 px-3 rounded-md text-foreground hover:bg-accent hover:text-accent-foreground transform hover:scale-105 transition-all duration-200 ease-in-out"
                                    >
                                        {React.cloneElement(link.icon, { className: "h-5 w-5" })}
                                        {link.label}
                                    </Link>
                                ))}
                            </nav>
                            <div className="p-4 border-t border-border mt-auto">
                                <Button asChild variant="default" size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                                    <Link href={accountButtonHref} onClick={() => setIsMobileMenuOpen(false)}>{accountButtonText}</Link>
                                </Button>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
