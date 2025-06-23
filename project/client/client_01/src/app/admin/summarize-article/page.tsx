
'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { summarizeArticle, SummarizeArticleInput } from '@/ai/flows/summarize-article';
import { Loader2, ClipboardEdit, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
    articleText: z.string().min(100, { message: "Article text must be at least 100 characters to summarize effectively." }),
});

type FormData = z.infer<typeof formSchema>;

export default function SummarizeArticlePage() {
    const [summary, setSummary] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            articleText: "",
        },
    });

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        setIsLoading(true);
        setSummary('');
        try {
            const result = await summarizeArticle(data as SummarizeArticleInput);
            setSummary(result.summary);
            if (result.summary) {
                toast({
                    title: "Summary Generated!",
                    description: "The article has been successfully summarized.",
                    action: <CheckCircle className="text-green-500 h-5 w-5" />,
                });
            } else {
                toast({ title: "No summary generated", description: "The AI couldn't generate a summary for this content." });
            }
        } catch (error) {
            console.error("Error summarizing article:", error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to summarize the article. Please try again.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto py-8">
            <Card className="shadow-xl">
                <CardHeader>
                    <CardTitle className="font-headline text-3xl flex items-center gap-2">
                        <ClipboardEdit className="h-8 w-8 text-accent" />
                        AI Article Summarizer
                    </CardTitle>
                    <CardDescription>
                        Paste your article text below to generate a concise summary. Useful for meta descriptions or quick takeaways.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="articleText"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-lg">Full Article Text</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Paste the entire content of your article here..."
                                                {...field}
                                                rows={18}
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
                                        Generating Summary...
                                    </>
                                ) : (
                                    'Summarize Article'
                                )}
                            </Button>
                        </form>
                    </Form>

                    {summary && (
                        <div className="mt-8 pt-6 border-t border-border">
                            <h3 className="text-xl font-semibold mb-3 font-headline text-accent">Generated Summary:</h3>
                            <div className="p-4 bg-muted rounded-md shadow">
                                <p className="text-foreground/90 whitespace-pre-wrap">{summary}</p>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                className="mt-4"
                                onClick={() => {
                                    navigator.clipboard.writeText(summary);
                                    toast({ title: "Summary Copied!", description: "The generated summary has been copied to your clipboard." });
                                }}
                            >
                                Copy Summary
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
