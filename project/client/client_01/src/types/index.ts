
export interface Author {
    name: string;
    avatarUrl?: string;
}

export interface Post {
    id: string;
    slug: string;
    title: string;
    contentMarkdown: string;
    summary: string;
    imageUrl: string;
    category: string;
    tags: string[];
    publishedAt: string; // ISO date string e.g. "2023-10-26T10:00:00.000Z"
    author: Author;
}

export type Category = string;

export interface Comment {
    id: string;
    postId: string;
    authorName: string;
    text: string;
    createdAt: string; // ISO date string
    avatarUrl?: string; // Optional: for comment author avatar
}
