
import type { Comment } from '@/types';

// In-memory store for mock comments
const MOCK_COMMENTS: Comment[] = [
    {
        id: 'c1',
        postId: '1', // Corresponds to 'getting-started-with-nextjs-15'
        authorName: 'Jane Doe',
        text: 'Great introduction to Next.js 15! Looking forward to trying out the new features.',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
        avatarUrl: 'https://placehold.co/40x40.png',
    },
    {
        id: 'c2',
        postId: '1',
        authorName: 'John Smith',
        text: 'Very helpful, especially the part about server components. Thanks!',
        createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
        avatarUrl: 'https://placehold.co/40x40.png',
    },
    {
        id: 'c3',
        postId: '2', // Corresponds to 'mastering-tailwind-css-for-modern-uis'
        authorName: 'Alice Brown',
        text: 'Tailwind CSS is a game changer. This post clarifies some advanced concepts really well.',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
        avatarUrl: 'https://placehold.co/40x40.png',
    }
];

export async function getCommentsByPostId(postId: string): Promise<Comment[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return MOCK_COMMENTS.filter(comment => comment.postId === postId)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function addComment(postId: string, authorName: string, text: string): Promise<Comment> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    const newComment: Comment = {
        id: `c${MOCK_COMMENTS.length + 1}`,
        postId,
        authorName,
        text,
        createdAt: new Date().toISOString(),
        avatarUrl: 'https://placehold.co/40x40.png', // Default avatar for new comments
    };
    MOCK_COMMENTS.push(newComment);
    return newComment;
}
