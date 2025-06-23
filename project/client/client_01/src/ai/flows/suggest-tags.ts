'use server';

/**
 * @fileOverview An AI agent that suggests relevant tags for blog posts.
 *
 * - suggestTags - A function that suggests tags for a given blog post.
 * - SuggestTagsInput - The input type for the suggestTags function.
 * - SuggestTagsOutput - The return type for the suggestTags function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SuggestTagsInputSchema = z.object({
    blogPostContent: z
        .string()
        .describe('The content of the blog post for which tags are to be suggested.'),
});
export type SuggestTagsInput = z.infer<typeof SuggestTagsInputSchema>;

const SuggestTagsOutputSchema = z.object({
    tags: z
        .array(z.string())
        .describe('An array of suggested tags relevant to the blog post content.'),
});
export type SuggestTagsOutput = z.infer<typeof SuggestTagsOutputSchema>;

export async function suggestTags(input: SuggestTagsInput): Promise<SuggestTagsOutput> {
    return suggestTagsFlow(input);
}

const prompt = ai.definePrompt({
    name: 'suggestTagsPrompt',
    input: { schema: SuggestTagsInputSchema },
    output: { schema: SuggestTagsOutputSchema },
    prompt: `You are an expert in content tagging and SEO optimization.

  Based on the content of the blog post provided, suggest a list of tags that would be relevant for improving its discoverability. Return the tags as a JSON array of strings.

  Blog Post Content: {{{blogPostContent}}}
  `,
});

const suggestTagsFlow = ai.defineFlow(
    {
        name: 'suggestTagsFlow',
        inputSchema: SuggestTagsInputSchema,
        outputSchema: SuggestTagsOutputSchema,
    },
    async input => {
        const { output } = await prompt(input);
        return output!;
    }
);
