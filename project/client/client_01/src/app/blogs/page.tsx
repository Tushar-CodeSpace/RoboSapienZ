
import { Suspense } from 'react';
import { getAllPosts, getAllCategories, countAllPosts } from '@/lib/posts';
import { BlogPostCard } from '@/components/BlogPostCard';
import { CategoryFilter } from '@/components/CategoryFilter';
import { SearchBlogInput } from '@/components/SearchBlogInput';
import { Pagination } from '@/components/Pagination';
import type { Category } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';

const POSTS_PER_PAGE = 12; // Changed from 10 to 12

interface BlogsPageProps {
    searchParams?: {
        category?: Category;
        query?: string;
        page?: string;
    };
}

async function PostsList({
    selectedCategory,
    searchQuery,
    currentPage
}: {
    selectedCategory?: Category;
    searchQuery?: string;
    currentPage: number;
}) {
    const posts = await getAllPosts(selectedCategory, searchQuery, currentPage, POSTS_PER_PAGE);

    if (posts.length === 0) {
        return <p className="text-center text-muted-foreground text-lg col-span-full">No posts found. Try a different filter or search term!</p>;
    }

    return (
        <>
            {posts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
            ))}
        </>
    );
}

function PostsListSkeleton() {
    return (
        <>
            {Array.from({ length: POSTS_PER_PAGE }).map((_, i) => (
                <div key={i} className="flex flex-col space-y-3">
                    <Skeleton className="h-[200px] w-full rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                    <div className="flex justify-between items-center pt-2">
                        <Skeleton className="h-6 w-1/4" />
                        <Skeleton className="h-6 w-1/4" />
                    </div>
                </div>
            ))}
        </>
    );
}

export default async function BlogsPage({ searchParams }: BlogsPageProps) {
    const categories = getAllCategories();
    const selectedCategory = searchParams?.category;
    const searchQuery = searchParams?.query;
    const currentPage = searchParams?.page ? parseInt(searchParams.page, 10) : 1;

    const totalPosts = await countAllPosts(selectedCategory, searchQuery);
    const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

    return (
        <div className="space-y-10">
            <div className="space-y-6">
                <h1 className="text-4xl font-headline font-bold mb-2 text-center">Latest Articles & Insights</h1>
                <p className="text-xl text-muted-foreground text-center mb-6">
                    Browse through our collection of articles. Use the filters and search to find content.
                </p>
                <SearchBlogInput />
                <CategoryFilter categories={categories} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Suspense key={`${selectedCategory}-${searchQuery}-${currentPage}`} fallback={<PostsListSkeleton />}>
                    <PostsList
                        selectedCategory={selectedCategory}
                        searchQuery={searchQuery}
                        currentPage={currentPage}
                    />
                </Suspense>
            </div>

            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    basePath="/blogs"
                />
            )}
        </div>
    );
}

export const revalidate = 60; // Revalidate data at most once per minute

