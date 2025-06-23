
'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    basePath: string; // e.g., /blogs or /admin/posts
}

export function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
    const pathname = usePathname(); // Should match basePath or be used for construction
    const searchParams = useSearchParams();

    const createPageURL = (pageNumber: number) => {
        const params = new URLSearchParams(searchParams.toString());
        if (pageNumber === 1 && params.has('page')) {
            params.delete('page');
        } else if (pageNumber > 1) {
            params.set('page', pageNumber.toString());
        } else {
            params.delete('page'); // Catch-all to remove page if it's 1 or less
        }
        return `${pathname}?${params.toString()}`;
    };

    if (totalPages <= 1) {
        return null;
    }

    const pageNumbers = [];
    const maxPagesToShow = 5; // Max number of page links to show (e.g., 1 ... 4 5 6 ... 10)
    const halfMaxPages = Math.floor(maxPagesToShow / 2);

    let startPage = Math.max(1, currentPage - halfMaxPages);
    let endPage = Math.min(totalPages, currentPage + halfMaxPages);

    if (currentPage - halfMaxPages < 1) {
        endPage = Math.min(totalPages, maxPagesToShow);
    }
    if (currentPage + halfMaxPages > totalPages) {
        startPage = Math.max(1, totalPages - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }


    return (
        <nav aria-label="Page navigation" className="flex justify-center items-center space-x-2 my-8">
            <Button
                asChild
                variant="outline"
                size="icon"
                disabled={currentPage <= 1}
                aria-disabled={currentPage <= 1}
                className={cn(currentPage <= 1 && "opacity-50 cursor-not-allowed")}
            >
                <Link href={createPageURL(currentPage - 1)} scroll={false}>
                    <ChevronLeft className="h-5 w-5" />
                    <span className="sr-only">Previous page</span>
                </Link>
            </Button>

            {startPage > 1 && (
                <>
                    <Button asChild variant="outline" size="sm">
                        <Link href={createPageURL(1)} scroll={false}>1</Link>
                    </Button>
                    {startPage > 2 && <span className="text-muted-foreground">...</span>}
                </>
            )}

            {pageNumbers.map((page) => (
                <Button
                    key={page}
                    asChild
                    variant={currentPage === page ? 'default' : 'outline'}
                    size="sm"
                    className={cn(currentPage === page && "font-bold")}
                >
                    <Link href={createPageURL(page)} scroll={false}>{page}</Link>
                </Button>
            ))}

            {endPage < totalPages && (
                <>
                    {endPage < totalPages - 1 && <span className="text-muted-foreground">...</span>}
                    <Button asChild variant="outline" size="sm">
                        <Link href={createPageURL(totalPages)} scroll={false}>{totalPages}</Link>
                    </Button>
                </>
            )}

            <Button
                asChild
                variant="outline"
                size="icon"
                disabled={currentPage >= totalPages}
                aria-disabled={currentPage >= totalPages}
                className={cn(currentPage >= totalPages && "opacity-50 cursor-not-allowed")}
            >
                <Link href={createPageURL(currentPage + 1)} scroll={false}>
                    <ChevronRight className="h-5 w-5" />
                    <span className="sr-only">Next page</span>
                </Link>
            </Button>
        </nav>
    );
}
