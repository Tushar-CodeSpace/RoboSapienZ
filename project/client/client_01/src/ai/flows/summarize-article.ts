'use server';

/**
 * @fileOverview Article summarization AI agent.
 *
 * - summarizeArticle - A function that handles the article summarization process.
 * - SummarizeArticleInput - The input type for the summarizeArticle function.
 * - SummarizeArticleOutput - The return type for the summarizeArticle function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SummarizeArticleInputSchema = z.object({
    articleText: z.string().describe('The text content of the article to be summarized.'),
});
export type SummarizeArticleInput = z.infer<typeof SummarizeArticleInputSchema>;

const SummarizeArticleOutputSchema = z.object({
    summary: z.string().describe('A brief summary of the article.'),
});
export type SummarizeArticleOutput = z.infer<typeof SummarizeArticleOutputSchema>;

export async function summarizeArticle(input: SummarizeArticleInput): Promise<SummarizeArticleOutput> {
    return summarizeArticleFlow(input);
}

const prompt = ai.definePrompt({
    name: 'summarizeArticlePrompt',
    input: { schema: SummarizeArticleInputSchema },
    output: { schema: SummarizeArticleOutputSchema },
    prompt: `Summarize the following article in a concise paragraph:\n\n{{{articleText}}}`,
});

const summarizeArticleFlow = ai.defineFlow(
    {
        name: 'summarizeArticleFlow',
        inputSchema: SummarizeArticleInputSchema,
        outputSchema: SummarizeArticleOutputSchema,
    },
    async input => {
        const { output } = await prompt(input);
        return output!;
    }
);
