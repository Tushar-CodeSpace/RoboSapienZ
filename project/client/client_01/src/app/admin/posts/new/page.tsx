
'use client';

import { useState, useEffect, useRef } from 'react'; // Added useRef
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { createPost, getAllCategories } from '@/lib/posts';
import type { Category } from '@/types';
import { Loader2, PlusCircle, PencilLine } from 'lucide-react';
import { MarkdownToolbar } from '@/components/MarkdownToolbar'; // Added MarkdownToolbar

const formSchema = z.object({
    title: z.string().min(5, { message: "Title must be at least 5 characters." }),
    category: z.string().min(1, { message: "Please select or enter a category." }),
    tags: z.string().min(2, { message: "Please enter at least one tag." }),
    imageUrl: z.string().url({ message: "Please enter a valid image URL." }).default("https://placehold.co/600x400.png"),
    authorName: z.string().min(2, { message: "Author name must be at least 2 characters." }).default("Admin"),
    contentText: z.string().min(50, { message: "Content must be at least 50 characters." }),
});

type FormData = z.infer<typeof formSchema>;

async function handleCreatePost(data: FormData) {
    const newPostData = {
        title: data.title,
        category: data.category,
        tagsString: data.tags,
        imageUrl: data.imageUrl,
        authorName: data.authorName,
        contentText: data.contentText,
    };
    const result = await createPost(newPostData);
    return result;
}


export default function CreatePostPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const { toast } = useToast();
    const router = useRouter();
    const contentTextareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        setCategories(getAllCategories());
    }, []);

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            category: "",
            tags: "",
            imageUrl: "https://placehold.co/600x400.png",
            authorName: "Admin",
            contentText: "",
        },
    });

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        setIsLoading(true);
        try {
            const newPost = await handleCreatePost(data);
            toast({
                title: "Post Created!",
                description: `"${newPost.title}" has been successfully created.`,
            });
            router.push(`/posts/${newPost.slug}`);
        } catch (error) {
            console.error("Error creating post:", error);
            toast({
                variant: "destructive",
                title: "Error Creating Post",
                description: error instanceof Error ? error.message : "An unknown error occurred. Please try again.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="shadow-xl max-w-3xl mx-auto">
            <CardHeader>
                <CardTitle className="font-headline text-3xl flex items-center gap-2">
                    <PlusCircle className="h-8 w-8 text-accent" />
                    Create New Blog Post
                </CardTitle>
                <CardDescription>
                    Fill in the details below to publish a new article on RoboSapienZ. Use Markdown for content formatting.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-lg">Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter post title" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-lg">Category</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a category" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {categories.map((cat) => (
                                                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="tags"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-lg">Tags (comma-separated)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g., robotics, automation, AI" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="imageUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-lg">Image URL</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://example.com/image.png" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="authorName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-lg">Author Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter author's name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="contentText"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-lg flex items-center gap-1">
                                        <PencilLine className="h-5 w-5" /> Content
                                    </FormLabel>
                                    <MarkdownToolbar
                                        textareaRef={contentTextareaRef}
                                        setValue={(value) => form.setValue('contentText', value, { shouldValidate: true, shouldDirty: true })}
                                    />
                                    <FormControl>
                                        <Textarea
                                            ref={contentTextareaRef}
                                            placeholder="Write your blog post content here. Use Markdown for formatting (e.g., # Heading, **bold**, *italic*, lists, code blocks)."
                                            {...field}
                                            rows={15}
                                            className="mt-2" // Add margin to separate from toolbar
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" disabled={isLoading} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Publishing Post...
                                </>
                            ) : (
                                'Publish Post'
                            )}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
