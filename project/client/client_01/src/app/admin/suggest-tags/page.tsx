'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { suggestTags, SuggestTagsInput } from '@/ai/flows/suggest-tags';
import { Badge } from '@/components/ui/badge';
import { Loader2, Lightbulb } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
    blogPostContent: z.string().min(50, { message: "Blog post content must be at least 50 characters." }),
});

type FormData = z.infer<typeof formSchema>;

export default function SuggestTagsPage() {
    const [suggestedTags, setSuggestedTags] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            blogPostContent: "",
        },
    });

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        setIsLoading(true);
        setSuggestedTags([]);
        try {
            const result = await suggestTags(data as SuggestTagsInput);
            setSuggestedTags(result.tags);
            if (result.tags.length === 0) {
                toast({ title: "No tags suggested", description: "The AI couldn't find relevant tags for this content." });
            }
        } catch (error) {
            console.error("Error suggesting tags:", error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to suggest tags. Please try again.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto py-8">
            <Card className="shadow-xl">
                <CardHeader>
                    <CardTitle className="font-headline text-3xl flex items-center gap-2">
                        <Lightbulb className="h-8 w-8 text-accent" />
                        Smart Tag Suggestions
                    </CardTitle>
                    <CardDescription>
                        Paste your blog post content below and let AI suggest relevant tags to improve discoverability.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="blogPostContent"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-lg">Blog Post Content</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Paste your full blog post content here..."
                                                {...field}
                                                rows={15}
                                                className="bg-card border-border focus:ring-accent"
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
                                        Suggesting Tags...
                                    </>
                                ) : (
                                    'Suggest Tags'
                                )}
                            </Button>
                        </form>
                    </Form>

                    {suggestedTags.length > 0 && (
                        <div className="mt-8 pt-6 border-t border-border">
                            <h3 className="text-xl font-semibold mb-3 font-headline">Suggested Tags:</h3>
                            <div className="flex flex-wrap gap-2">
                                {suggestedTags.map((tag, index) => (
                                    <Badge key={index} variant="default" className="text-sm bg-accent text-accent-foreground hover:bg-accent/80">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
