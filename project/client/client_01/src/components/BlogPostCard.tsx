
import Link from 'next/link';
import Image from 'next/image';
import type { Post } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays, UserCircle, Tag as TagIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface BlogPostCardProps {
    post: Post;
    className?: string; // Added className prop
}

export function BlogPostCard({ post, className }: BlogPostCardProps) {
    const publishedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <Card className={cn(
            "flex flex-col h-full transform hover:scale-105 transition-all duration-300 ease-in-out bg-card hover:border-accent border border-transparent",
            className // Applied className prop
        )}>
            <CardHeader>
                <div className="relative w-full h-48 mb-4 rounded-t-lg overflow-hidden">
                    <Image
                        src={post.imageUrl}
                        alt={post.title}
                        layout="fill"
                        objectFit="cover"
                        data-ai-hint="technology blog post"
                    />
                </div>
                <CardTitle className="font-headline text-2xl hover:text-accent transition-colors">
                    <Link href={`/posts/${post.slug}`}>{post.title}</Link>
                </CardTitle>
                <div className="text-sm text-muted-foreground flex flex-wrap gap-x-4 gap-y-1 items-center mt-1">
                    <span className="flex items-center gap-1"><CalendarDays className="h-4 w-4" /> {publishedDate}</span>
                    <span className="flex items-center gap-1"><UserCircle className="h-4 w-4" /> {post.author.name}</span>
                    <span className="flex items-center gap-1"><TagIcon className="h-4 w-4" /> {post.category}</span>
                </div>
            </CardHeader>
            <CardContent className="flex-grow">
                <p className="text-muted-foreground line-clamp-3">{post.summary}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
                <Link href={`/posts/${post.slug}`} passHref>
                    <Button variant="link" className="text-accent p-0 hover:underline">Read More &rarr;</Button>
                </Link>
                <div className="space-x-1">
                    {post.tags.slice(0, 2).map(tag => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                </div>
            </CardFooter>
        </Card>
    );
}
