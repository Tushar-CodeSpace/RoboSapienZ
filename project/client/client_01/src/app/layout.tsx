
import type { Metadata } from 'next';
import './globals.css';
// Removed React, useState, useEffect imports
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from '@/components/ThemeProvider';
import { GlobalLoadingIndicator } from '@/components/GlobalLoadingIndicator';
import { ClientLayoutWrapper } from '@/components/ClientLayoutWrapper'; // Import the new wrapper

export const metadata: Metadata = {
    title: 'RoboSapienZ - Industrial Automation & Robotics Insights',
    description: 'Your go-to source for knowledge on industrial automation, robotics, and the future of manufacturing.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // No client-side hooks (useState, useEffect) here
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Space+Grotesk:wght@400;500;700&family=Source+Code+Pro:wght@400;700&display=swap" rel="stylesheet" />
            </head>
            <body className="font-body antialiased min-h-screen flex flex-col">
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem={false}
                    themes={['light']}
                >
                    <GlobalLoadingIndicator /> {/* GLI is independent */}
                    <ClientLayoutWrapper> {/* Wrapper handles Header, main, Footer rendering */}
                        {children}
                    </ClientLayoutWrapper>
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    );
}
