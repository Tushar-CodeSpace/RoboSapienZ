
'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

interface ClientLayoutWrapperProps {
    children: React.ReactNode;
}

export function ClientLayoutWrapper({ children }: ClientLayoutWrapperProps) {
    const [clientMounted, setClientMounted] = useState(false);

    useEffect(() => {
        setClientMounted(true);
    }, []);

    if (!clientMounted) {
        // Return null (or a minimal placeholder) while waiting for client to mount.
        // The GlobalLoadingIndicator in RootLayout handles the visual loading state.
        return null;
    }

    return (
        <>
            <Header />
            <main className="flex-grow container mx-auto px-4">
                {children}
            </main>
            <Footer />
        </>
    );
}
