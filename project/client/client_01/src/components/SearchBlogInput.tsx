
'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

export function SearchBlogInput() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get('query') || '';
    const [searchTerm, setSearchTerm] = useState(initialQuery);

    useEffect(() => {
        setSearchTerm(initialQuery);
    }, [initialQuery]);

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const params = new URLSearchParams(searchParams.toString());
        if (searchTerm) {
            params.set('query', searchTerm);
        } else {
            params.delete('query');
        }
        params.delete('page'); // Reset to page 1 on new search
        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <form onSubmit={handleSearch} className="flex w-full max-w-xl mx-auto items-center space-x-2 mb-6">
            <Input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-grow"
            />
            <Button
                type="submit"
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold hover:scale-105 transform transition-all"
            >
                <Search className="mr-2 h-4 w-4" /> Search
            </Button>
        </form>
    );
}

