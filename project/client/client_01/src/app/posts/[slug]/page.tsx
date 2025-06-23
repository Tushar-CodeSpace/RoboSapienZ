
'use client';

import { useEffect, useState } from 'react';
import { useParams, notFound as navigateNotFound } from 'next/navigation'; // Renamed notFound to avoid conflict
import Image from 'next/image';
import { getPostBySlug, getAllPosts } from '@/lib/posts';
import { getCommentsByPostId, addComment as apiAddComment } from '@/lib/comments';
import type { Post, Comment } from '@/types';
import { ShareButtons } from '@/components/ShareButtons';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, UserCircle, Tag as TagIcon, MessageSquare, Send, Loader2, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

const commentFormSchema = z.object({
    authorName: z.string().min(2, { message: "Name must be at least 2 characters." }).max(50, { message: "Name must be 50 characters or less." }),
    text: z.string().min(5, { message: "Comment must be at least 5 characters." }).max(500, { message: "Comment must be 500 characters or less." }),
});

type CommentFormData = z.infer<typeof commentFormSchema>;

// export async function generateStaticParams() {
//   const posts = await getAllPosts(); // This is fine as it runs at build time
//   return posts.map(post => ({ slug: post.slug }));
// }
// Disabling generateStaticParams for now as it can cause issues with dynamic comment loading in this setup
// and the mock data structure. Re-enable if full static generation is required and data fetching is adjusted.


export default function PostPage() {
    const params = useParams();
    const slug = typeof params.slug === 'string' ? params.slug : '';
    const { toast } = useToast();

    const [post, setPost] = useState<Post | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [isLoadingPost, setIsLoadingPost] = useState(true);
    const [isLoadingComments, setIsLoadingComments] = useState(true);
    const [isSubmittingComment, setIsSubmittingComment] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const form = useForm<CommentFormData>({
        resolver: zodResolver(commentFormSchema),
        defaultValues: {
            authorName: '',
            text: '',
        },
    });

    useEffect(() => {
        if (!slug) {
            setError("Post slug is missing.");
            setIsLoadingPost(false);
            return;
        }

        async function fetchData() {
            try {
                setIsLoadingPost(true);
                const postData = await getPostBySlug(slug);
                if (!postData) {
                    setError("Post not found.");
                    // For client components, you might redirect or show a "Not Found" UI
                    // navigateNotFound(); // This is for server components.
                } else {
                    setPost(postData);
                    setError(null);
                }
            } catch (e) {
                console.error("Failed to load post:", e);
                setError("Failed to load post.");
            } finally {
                setIsLoadingPost(false);
            }
        }
        fetchData();
    }, [slug]);

    useEffect(() => {
        if (post && post.id) {
            async function fetchComments() {
                try {
                    setIsLoadingComments(true);
                    const commentsData = await getCommentsByPostId(post!.id);
                    setComments(commentsData);
                } catch (e) {
                    console.error("Failed to load comments:", e);
                    toast({ variant: "destructive", title: "Error", description: "Could not load comments." });
                } finally {
                    setIsLoadingComments(false);
                }
            }
            fetchComments();
        }
    }, [post, toast]);

    const handleCommentSubmit: SubmitHandler<CommentFormData> = async (data) => {
        if (!post || !post.id) return;
        setIsSubmittingComment(true);
        try {
            const newComment = await apiAddComment(post.id, data.authorName, data.text);
            setComments(prevComments => [newComment, ...prevComments]);
            form.reset();
            toast({ title: "Comment posted!", description: "Your comment has been successfully added." });
        } catch (e) {
            console.error("Failed to submit comment:", e);
            toast({ variant: "destructive", title: "Error", description: "Failed to post comment. Please try again." });
        } finally {
            setIsSubmittingComment(false);
        }
    };

    if (isLoadingPost) {
        return (
            <div className="max-w-3xl mx-auto py-8 px-4 space-y-8">
                <Skeleton className="h-12 w-3/4 mb-4" />
                <Skeleton className="h-6 w-1/2 mb-4" />
                <Skeleton className="h-96 w-full rounded-lg mb-8" />
                <Skeleton className="h-20 w-full mb-2" />
                <Skeleton className="h-20 w-full mb-2" />
                <Skeleton className="h-20 w-full" />
            </div>
        );
    }

    if (error) {
        // A simple error display. In a real app, you might want a more sophisticated error page.
        return <div className="text-center py-10 text-red-500 text-xl">{error}</div>;
    }

    if (!post) {
        // This case handles when postData is null after fetch, and no error was thrown during fetch.
        // It implies the slug didn't match any post.
        return <div className="text-center py-10 text-muted-foreground text-xl">Post not found.</div>;
    }

    const publishedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="max-w-3xl mx-auto py-8 px-4">
            <article>
                <header className="mb-8">
                    <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4 text-foreground">{post.title}</h1>
                    <div className="text-sm text-muted-foreground flex flex-wrap gap-x-4 gap-y-2 items-center mb-4">
                        <span className="flex items-center gap-1"><CalendarDays className="h-4 w-4" /> {publishedDate}</span>
                        <span className="flex items-center gap-1"><UserCircle className="h-4 w-4" /> {post.author.name}</span>
                        <span className="flex items-center gap-1"><TagIcon className="h-4 w-4" /> {post.category}</span>
                    </div>
                    <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-lg">
                        <Image
                            src={post.imageUrl}
                            alt={post.title}
                            fill={true}
                            style={{ objectFit: 'cover' }}
                            data-ai-hint="programming article hero"
                            priority
                        />
                    </div>
                </header>

                <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl dark:prose-invert max-w-none text-foreground">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {post.contentMarkdown}
                    </ReactMarkdown>
                </div>

                <footer className="mt-12">
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-2 text-foreground">Tags:</h3>
                        <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-sm">{tag}</Badge>
                            ))}
                        </div>
                    </div>
                    <ShareButtons title={post.title} />
                </footer>
            </article>

            <Separator className="my-12" />

            <section id="comments" className="space-y-8">
                <h2 className="text-3xl font-headline font-semibold text-foreground flex items-center gap-2">
                    <MessageSquare className="h-7 w-7 text-accent" />
                    Comments ({comments.length})
                </h2>

                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-xl font-headline">Leave a Comment</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleCommentSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="authorName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-lg">Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Your name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="text"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-lg">Comment</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Write your comment here..." {...field} rows={5} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" disabled={isSubmittingComment} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                                    {isSubmittingComment ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="mr-2 h-4 w-4" />
                                            Post Comment
                                        </>
                                    )}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    {isLoadingComments ? (
                        Array.from({ length: 2 }).map((_, index) => (
                            <Card key={index} className="shadow-sm">
                                <CardContent className="p-4">
                                    <div className="flex items-start gap-3">
                                        <Skeleton className="h-10 w-10 rounded-full" />
                                        <div className="flex-1 space-y-2">
                                            <Skeleton className="h-4 w-1/4" />
                                            <Skeleton className="h-3 w-1/6" />
                                            <Skeleton className="h-10 w-full" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    ) : comments.length > 0 ? (
                        comments.map((comment) => (
                            <Card key={comment.id} className="shadow-sm bg-card border-border/50">
                                <CardContent className="p-4">
                                    <div className="flex items-start gap-4">
                                        <Avatar className="h-10 w-10 border-2 border-primary/20">
                                            <AvatarImage src={comment.avatarUrl || 'https://placehold.co/40x40.png'} alt={comment.authorName} data-ai-hint="person avatar" />
                                            <AvatarFallback className="bg-muted text-muted-foreground">
                                                <User className="h-5 w-5" />
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <div className="flex items-baseline justify-between">
                                                <p className="font-semibold text-foreground">{comment.authorName}</p>
                                                <time dateTime={comment.createdAt} className="text-xs text-muted-foreground">
                                                    {new Date(comment.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                    {' at '}
                                                    {new Date(comment.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                                </time>
                                            </div>
                                            <p className="mt-1 text-foreground/90 whitespace-pre-wrap">{comment.text}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <p className="text-center text-muted-foreground py-4">No comments yet. Be the first to comment!</p>
                    )}
                </div>
            </section>
        </div>
    );
}
