
import type { Post, Category, Author } from '@/types'; // Removed ContentBlock
import { summarizeArticle } from '@/ai/flows/summarize-article';

// Helper function to convert old contentBlocks to Markdown (simplified)
function contentBlocksToMarkdown(blocks: any[]): string {
    return blocks.map(block => {
        if (block.type === 'heading') {
            return `${'#'.repeat(block.level)} ${block.text}`;
        }
        if (block.type === 'paragraph') {
            return block.text;
        }
        if (block.type === 'code') {
            return `\`\`\`${block.language || ''}\n${block.code}\n\`\`\``;
        }
        return '';
    }).join('\n\n');
}

const MOCK_POSTS_OLD_FORMAT = [
    {
        id: '1',
        slug: 'getting-started-with-nextjs-15',
        title: 'Getting Started with Next.js 15: A Beginner\'s Guide',
        contentBlocks: [
            { type: 'paragraph', text: 'Next.js 15 introduces a host of new features that enhance developer experience and application performance. This guide will walk you through setting up your first Next.js 15 project.' },
            { type: 'heading', level: 2, text: 'Prerequisites' },
            { type: 'paragraph', text: 'Ensure you have Node.js version 18.17 or later installed.' },
            { type: 'heading', level: 2, text: 'Installation' },
            { type: 'paragraph', text: 'Create a new Next.js app using the following command:' },
            { type: 'code', language: 'bash', code: 'npx create-next-app@latest my-nextjs-app' },
            { type: 'paragraph', text: 'Navigate into your new project directory and start the development server:' },
            { type: 'code', language: 'bash', code: 'cd my-nextjs-app\nnpm run dev' },
            { type: 'paragraph', text: 'Open http://localhost:3000 in your browser to see your new app!' }
        ],
        summary: 'A beginner-friendly introduction to setting up and using Next.js 15, highlighting its new features for enhanced developer experience and application performance.',
        imageUrl: 'https://placehold.co/600x400.png',
        category: 'Web Development',
        tags: ['Next.js', 'React', 'JavaScript', 'WebDev'],
        publishedAt: '2024-07-20T10:00:00.000Z',
        author: { name: 'AI Dev', avatarUrl: 'https://placehold.co/100x100.png' },
    },
    {
        id: '2',
        slug: 'mastering-tailwind-css-for-modern-uis',
        title: 'Mastering Tailwind CSS for Modern UIs',
        contentBlocks: [
            { type: 'paragraph', text: 'Tailwind CSS is a utility-first CSS framework that allows for rapid UI development. This post explores advanced techniques and best practices.' },
            { type: 'code', language: 'css', code: `/* Example: Customizing Tailwind theme */\n@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n@layer theme {\n  extend {\n    colors: {\n      'brand-blue': '#1DA1F2',\n    }\n  }\n}` },
            { type: 'paragraph', text: 'Learn how to configure JIT mode, create custom utility classes, and optimize your build for production.' }
        ],
        summary: 'An exploration of advanced techniques and best practices for using Tailwind CSS, a utility-first framework, to build modern and responsive user interfaces rapidly.',
        imageUrl: 'https://placehold.co/600x400.png',
        category: 'Frontend',
        tags: ['TailwindCSS', 'CSS', 'UI/UX', 'Frontend'],
        publishedAt: '2024-07-18T14:30:00.000Z',
        author: { name: 'UX Guru', avatarUrl: 'https://placehold.co/100x100.png' },
    },
    {
        id: '3',
        slug: 'exploring-the-power-of-server-components',
        title: 'Exploring the Power of React Server Components',
        contentBlocks: [
            { type: 'paragraph', text: 'React Server Components (RSCs) are revolutionizing how we build React applications by allowing components to run on the server. This significantly reduces client-side JavaScript and improves performance.' },
            { type: 'heading', level: 2, text: 'Key Benefits' },
            { type: 'paragraph', text: 'Zero-bundle-size components, direct access to server-side data sources, and automatic code splitting are some of the advantages.' },
            { type: 'code', language: 'javascript', code: `// Example of a Server Component\nasync function MyServerComponent() {\n  const data = await fetchDataFromDB();\n  return <div>{data.message}</div>;\n}\n\nexport default MyServerComponent;` },
            { type: 'paragraph', text: 'Dive deep into how RSCs work and how to integrate them into your Next.js projects.' }
        ],
        summary: 'An overview of React Server Components (RSCs), detailing their benefits such as zero-bundle-size, direct server-side data access, and improved application performance.',
        imageUrl: 'https://placehold.co/600x400.png',
        category: 'React',
        tags: ['React', 'Server Components', 'Performance', 'Next.js'],
        publishedAt: '2024-07-15T09:00:00.000Z',
        author: { name: 'React Enthusiast', avatarUrl: 'https://placehold.co/100x100.png' },
    },
    {
        id: '4',
        slug: 'advanced-typescript-patterns',
        title: 'Advanced TypeScript Patterns for Scalable Apps',
        contentBlocks: [{ type: 'paragraph', text: 'Explore advanced TypeScript patterns like conditional types, mapped types, and template literal types to build more robust and scalable applications. This is key for large projects.' }],
        summary: 'A discussion of advanced TypeScript patterns, including conditional types and mapped types, to build more robust and scalable applications, crucial for large-scale projects.',
        imageUrl: 'https://placehold.co/600x400.png',
        category: 'Web Development',
        tags: ['TypeScript', 'JavaScript', 'Programming'],
        publishedAt: '2024-07-12T11:00:00.000Z',
        author: { name: 'TS Pro', avatarUrl: 'https://placehold.co/100x100.png' },
    },
    {
        id: '5',
        slug: 'deep-dive-into-css-grid',
        title: 'A Deep Dive into CSS Grid Layout',
        contentBlocks: [{ type: 'paragraph', text: 'CSS Grid is a powerful layout system. This post covers its core concepts, common use cases, and how it compares to Flexbox. Essential for modern web design.' }],
        summary: 'A comprehensive look at CSS Grid Layout, covering its core concepts, common use cases, and comparisons with Flexbox for modern web design.',
        imageUrl: 'https://placehold.co/600x400.png',
        category: 'Frontend',
        tags: ['CSS', 'Grid', 'Layout', 'Web Design'],
        publishedAt: '2024-07-10T16:00:00.000Z',
        author: { name: 'Layout Master', avatarUrl: 'https://placehold.co/100x100.png' },
    },
    {
        id: '6',
        slug: 'state-management-in-react-2024',
        title: 'State Management in React: 2024 Edition',
        contentBlocks: [{ type: 'paragraph', text: 'A comprehensive overview of state management solutions in React for 2024, including Zustand, Jotai, Valtio, and the built-in Context API. Understand when to use each.' }],
        summary: 'An overview of modern state management solutions for React applications in 2024, including Zustand, Jotai, and the Context API, with guidance on their use cases.',
        imageUrl: 'https://placehold.co/600x400.png',
        category: 'React',
        tags: ['React', 'State Management', 'Zustand', 'Jotai'],
        publishedAt: '2024-07-08T09:30:00.000Z',
        author: { name: 'React Architect', avatarUrl: 'https://placehold.co/100x100.png' },
    },
    {
        id: '7',
        slug: 'introduction-to-genkit-ai',
        title: 'Introduction to Genkit for AI Applications',
        contentBlocks: [{ type: 'paragraph', text: 'Genkit is a framework for building AI-powered applications. This introductory guide covers setup, core concepts, and building your first Genkit flow. Perfect for AI integration.' }],
        summary: 'A beginner\'s guide to Genkit, a framework for AI applications, covering setup, core concepts, and building initial AI-powered flows.',
        imageUrl: 'https://placehold.co/600x400.png',
        category: 'AI',
        tags: ['Genkit', 'AI', 'Machine Learning', 'Development'],
        publishedAt: '2024-07-05T14:00:00.000Z',
        author: { name: 'AI Explorer', avatarUrl: 'https://placehold.co/100x100.png' },
    },
    {
        id: '8',
        slug: 'optimizing-web-performance-with-next-image',
        title: 'Optimizing Web Performance with Next.js Image Component',
        contentBlocks: [{ type: 'paragraph', text: 'Learn how to leverage the Next.js Image component for automatic image optimization, lazy loading, and improved Core Web Vitals. Boost your site speed.' }],
        summary: 'Learn how to use the Next.js Image component for automatic image optimization, lazy loading, and improving Core Web Vitals to boost site speed.',
        imageUrl: 'https://placehold.co/600x400.png',
        category: 'Web Development',
        tags: ['Next.js', 'Performance', 'Images', 'Optimization'],
        publishedAt: '2024-07-02T10:00:00.000Z',
        author: { name: 'Perf Ninja', avatarUrl: 'https://placehold.co/100x100.png' },
    },
    {
        id: '9',
        slug: 'building-accessible-web-applications',
        title: 'Building Accessible Web Applications: A Comprehensive Guide',
        contentBlocks: [{ type: 'paragraph', text: 'Accessibility (a11y) is crucial for inclusive web design. This guide covers WCAG guidelines, ARIA attributes, and practical tips for making your apps accessible to everyone. Important for all developers.' }],
        summary: 'A guide to WCAG guidelines, ARIA attributes, and best practices for creating accessible web applications, ensuring inclusivity for all users.',
        imageUrl: 'https://placehold.co/600x400.png',
        category: 'Frontend',
        tags: ['Accessibility', 'a11y', 'Web Standards', 'UI/UX'],
        publishedAt: '2024-06-28T15:00:00.000Z',
        author: { name: 'A11y Advocate', avatarUrl: 'https://placehold.co/100x100.png' },
    },
    {
        id: '10',
        slug: 'understanding-server-actions-nextjs',
        title: 'Understanding Server Actions in Next.js',
        contentBlocks: [{ type: 'paragraph', text: 'Next.js Server Actions simplify data mutations and form handling by allowing you to run server-side code directly from your components. This post explains how they work and their benefits. A key Next.js feature.' }],
        summary: 'An explanation of Next.js Server Actions, detailing how they simplify data mutations and form handling by running server-side code directly from components.',
        imageUrl: 'https://placehold.co/600x400.png',
        category: 'React',
        tags: ['Next.js', 'Server Actions', 'React', 'Fullstack'],
        publishedAt: '2024-06-25T11:30:00.000Z',
        author: { name: 'Fullstack Dev', avatarUrl: 'https://placehold.co/100x100.png' },
    },
    {
        id: '11',
        slug: 'firebase-integration-with-nextjs',
        title: 'Integrating Firebase with Your Next.js Application',
        contentBlocks: [{ type: 'paragraph', text: 'A step-by-step guide to integrating Firebase services like Authentication, Firestore, and Storage into your Next.js app. Leverage the power of Firebase for backend needs.' }],
        summary: 'A step-by-step guide to integrating Firebase services such as Authentication, Firestore, and Storage into Next.js applications for robust backend functionality.',
        imageUrl: 'https://placehold.co/600x400.png',
        category: 'Web Development',
        tags: ['Next.js', 'Firebase', 'Backend', 'Fullstack'],
        publishedAt: '2024-06-22T09:00:00.000Z',
        author: { name: 'Firebase Fan', avatarUrl: 'https://placehold.co/100x100.png' },
    },
    {
        id: '12',
        slug: 'modern-css-features-you-should-use',
        title: 'Modern CSS Features You Should Be Using in 2024',
        contentBlocks: [{ type: 'paragraph', text: 'Explore powerful modern CSS features like container queries, :has() selector, logical properties, and new color functions that can simplify your styling workflow. Stay updated with CSS.' }],
        summary: 'An exploration of new and powerful CSS features available in 2024, such as container queries and the :has() selector, to simplify styling workflows.',
        imageUrl: 'https://placehold.co/600x400.png',
        category: 'Frontend',
        tags: ['CSS', 'Web Design', 'Frontend', 'Styling'],
        publishedAt: '2024-06-19T13:45:00.000Z',
        author: { name: 'CSS Wizard', avatarUrl: 'https://placehold.co/100x100.png' },
    },
    {
        id: '13',
        slug: 'the-rise-of-edge-computing-in-web-dev',
        title: 'The Rise of Edge Computing in Web Development',
        contentBlocks: [{ type: 'paragraph', text: 'Edge computing is changing how web applications are delivered, offering lower latency and improved performance. Learn about edge functions, CDNs, and their impact on development. The future of fast applications.' }],
        summary: 'A discussion on how edge computing, through edge functions and CDNs, is impacting web development by improving latency and application performance.',
        imageUrl: 'https://placehold.co/600x400.png',
        category: 'Infrastructure',
        tags: ['Edge Computing', 'Performance', 'CDN', 'DevOps'],
        publishedAt: '2024-06-15T10:15:00.000Z',
        author: { name: 'Edge Architect', avatarUrl: 'https://placehold.co/100x100.png' },
    },
    {
        id: '14',
        slug: 'ethical-ai-development-principles',
        title: 'Principles of Ethical AI Development',
        contentBlocks: [{ type: 'paragraph', text: 'As AI becomes more pervasive, ethical considerations are paramount. This article discusses key principles for developing AI responsibly, focusing on fairness, transparency, and accountability. Crucial for AI practitioners.' }],
        summary: 'An overview of key principles for ethical and responsible AI development, focusing on fairness, transparency, and accountability in AI systems.',
        imageUrl: 'https://placehold.co/600x400.png',
        category: 'AI',
        tags: ['AI Ethics', 'Responsible AI', 'Machine Learning', 'Philosophy'],
        publishedAt: '2024-06-12T16:30:00.000Z',
        author: { name: 'Ethicist Coder', avatarUrl: 'https://placehold.co/100x100.png' },
    },
    {
        id: '15',
        slug: 'getting-started-with-shadcn-ui',
        title: 'Getting Started with ShadCN UI for React Projects',
        contentBlocks: [{ type: 'paragraph', text: 'ShadCN UI provides beautifully designed, accessible components for React. This guide shows how to integrate it into your Next.js project and customize components to fit your brand. A popular choice for UI.' }],
        summary: 'A guide to integrating and customizing ShadCN UI components in React and Next.js projects, highlighting its accessible and well-designed elements.',
        imageUrl: 'https://placehold.co/600x400.png',
        category: 'React',
        tags: ['ShadCN UI', 'React', 'UI Components', 'Next.js', 'Frontend'],
        publishedAt: '2024-06-10T09:00:00.000Z',
        author: { name: 'Component Creator', avatarUrl: 'https://placehold.co/100x100.png' },
    }
];

const MOCK_POSTS: Post[] = MOCK_POSTS_OLD_FORMAT.map(post => ({
    ...post,
    contentMarkdown: contentBlocksToMarkdown(post.contentBlocks as any[]), // Cast to any[] to bypass type error during transition
    // contentBlocks field is removed by spreading ...post and then overwriting contentMarkdown
} as Omit<typeof post, 'contentBlocks'> & { contentMarkdown: string } as Post));


function formatErrorMessage(error: unknown): string {
    if (error instanceof Error) {
        if (error.message.includes("GoogleGenerativeAI Error") && error.message.includes("429 Too Many Requests")) {
            return "Rate limit exceeded with Gemini API. Please try again later or check your plan.";
        }
        return error.message;
    }
    if (typeof error === 'string') {
        return error;
    }
    try {
        return JSON.stringify(error);
    } catch (e) {
        return 'Unknown error object';
    }
}

export async function getAllPosts(
    selectedCategory?: Category,
    searchQuery?: string,
    page: number = 1,
    limit: number = 10
): Promise<Post[]> {
    let filteredPosts = MOCK_POSTS;

    if (selectedCategory) {
        filteredPosts = filteredPosts.filter(post => post.category === selectedCategory);
    }

    if (searchQuery) {
        const lowercasedQuery = searchQuery.toLowerCase();
        filteredPosts = filteredPosts.filter(post =>
            post.title.toLowerCase().includes(lowercasedQuery) ||
            post.contentMarkdown.toLowerCase().includes(lowercasedQuery) || // Search in Markdown content
            post.summary.toLowerCase().includes(lowercasedQuery)
        );
    }

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const sortedPosts = filteredPosts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    const paginatedPosts = sortedPosts.slice(startIndex, endIndex);

    const postsWithSummaries = await Promise.all(
        paginatedPosts.map(async (post) => {
            if (!post.summary) {
                try {
                    const articleText = post.contentMarkdown; // Use Markdown for summary
                    const summaryResult = await summarizeArticle({ articleText });
                    return { ...post, summary: summaryResult.summary };
                } catch (error) {
                    const errorMessage = formatErrorMessage(error);
                    console.error(`Failed to summarize article ${post.id}: ${errorMessage}`);
                    if (error instanceof Error && error.stack && !errorMessage.startsWith("Rate limit exceeded")) {
                        console.error("Stack trace:", error.stack);
                    }
                    return { ...post, summary: 'Summary currently unavailable.' };
                }
            }
            return post;
        })
    );
    return postsWithSummaries;
}

export async function countAllPosts(
    selectedCategory?: Category,
    searchQuery?: string
): Promise<number> {
    let filteredPosts = MOCK_POSTS;

    if (selectedCategory) {
        filteredPosts = filteredPosts.filter(post => post.category === selectedCategory);
    }

    if (searchQuery) {
        const lowercasedQuery = searchQuery.toLowerCase();
        filteredPosts = filteredPosts.filter(post =>
            post.title.toLowerCase().includes(lowercasedQuery) ||
            post.contentMarkdown.toLowerCase().includes(lowercasedQuery) || // Search in Markdown content
            post.summary.toLowerCase().includes(lowercasedQuery)
        );
    }
    return filteredPosts.length;
}


export async function getPostBySlug(slug: string): Promise<Post | undefined> {
    const post = MOCK_POSTS.find(p => p.slug === slug);
    if (post && !post.summary) {
        try {
            const articleText = post.contentMarkdown; // Use Markdown for summary
            const summaryResult = await summarizeArticle({ articleText });
            return { ...post, summary: summaryResult.summary };
        } catch (error) {
            const errorMessage = formatErrorMessage(error);
            console.error(`Failed to summarize article ${post.id} (slug: ${slug}): ${errorMessage}`);
            if (error instanceof Error && error.stack && !errorMessage.startsWith("Rate limit exceeded")) {
                console.error("Stack trace:", error.stack);
            }
            return { ...post, summary: 'Summary currently unavailable.' };
        }
    }
    return post;
}

export function getAllCategories(): Category[] {
    const categories = MOCK_POSTS.map(post => post.category);
    const uniqueCategories = Array.from(new Set(categories)).sort();
    return uniqueCategories;
}

interface CreatePostData {
    title: string;
    category: string;
    tagsString: string;
    imageUrl: string;
    authorName: string;
    contentText: string; // This will be Markdown content
}

function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}

export async function createPost(data: CreatePostData): Promise<Post> {
    const newId = (MOCK_POSTS.length + 1).toString();
    const slug = generateSlug(data.title);

    let finalSlug = slug;
    let counter = 1;
    while (MOCK_POSTS.some(p => p.slug === finalSlug)) {
        finalSlug = `${slug}-${counter}`;
        counter++;
    }

    const newPost: Post = {
        id: newId,
        slug: finalSlug,
        title: data.title,
        contentMarkdown: data.contentText, // Store contentText as Markdown
        summary: '',
        imageUrl: data.imageUrl,
        category: data.category,
        tags: data.tagsString.split(',').map(tag => tag.trim()).filter(tag => tag),
        publishedAt: new Date().toISOString(),
        author: {
            name: data.authorName,
            avatarUrl: 'https://placehold.co/100x100.png'
        },
    };

    try {
        const summaryResult = await summarizeArticle({ articleText: data.contentText }); // Summarize from Markdown
        newPost.summary = summaryResult.summary;
    } catch (error) {
        const errorMessage = formatErrorMessage(error);
        console.error(`Failed to summarize new article ${newPost.id}: ${errorMessage}`);
        if (error instanceof Error && error.stack && !errorMessage.startsWith("Rate limit exceeded")) {
            console.error("Stack trace:", error.stack);
        }
        newPost.summary = 'Summary generation pending. Please refresh or edit later.';
    }

    MOCK_POSTS.unshift(newPost);

    return newPost;
}
