
'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import type { Category } from '@/types';
import { Tag } from 'lucide-react';

interface CategoryFilterProps {
    categories: Category[];
}

export function CategoryFilter({ categories }: CategoryFilterProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const currentCategory = searchParams.get('category');

    const handleFilter = (category: Category | null) => {
        const params = new URLSearchParams(searchParams.toString());
        if (category) {
            params.set('category', category);
        } else {
            params.delete('category');
        }
        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="mb-8 flex flex-wrap gap-2 items-center">
            <Button
                variant={!currentCategory ? 'default' : 'outline'}
                onClick={() => handleFilter(null)}
                className="flex items-center gap-1"
            >
                All Posts
            </Button>
            {categories.map((category) => (
                <Button
                    key={category}
                    variant={currentCategory === category ? 'default' : 'outline'}
                    onClick={() => handleFilter(category)}
                    className="flex items-center gap-1"
                >
                    <Tag className="h-4 w-4" />
                    {category}
                </Button>
            ))}
        </div>
    );
}
