
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FileText, Tags, PlusCircle, BarChart3, ClipboardEdit } from 'lucide-react';

export default function AdminDashboardPage() {
    return (
        <div className="space-y-8">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="text-3xl font-headline">Admin Dashboard</CardTitle>
                    <CardDescription>Welcome to the RoboSapienZ admin panel. Manage your content and settings here.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-6">
                        From here, you can create new blog posts, manage existing ones, and utilize various SEO and content tools.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <DashboardActionCard
                            icon={<PlusCircle className="h-8 w-8 text-accent" />}
                            title="Create New Post"
                            description="Write and publish new articles for your blog."
                            href="/admin/posts/new"
                        />
                        <DashboardActionCard
                            icon={<Tags className="h-8 w-8 text-accent" />}
                            title="Suggest Tags"
                            description="Use AI to generate relevant tags for your content."
                            href="/admin/suggest-tags"
                        />
                        <DashboardActionCard
                            icon={<ClipboardEdit className="h-8 w-8 text-accent" />}
                            title="Summarize Article"
                            description="Generate concise summaries for articles (e.g., for meta descriptions)."
                            href="/admin/summarize-article"
                        />
                        <DashboardActionCard
                            icon={<FileText className="h-8 w-8 text-accent" />}
                            title="View All Posts"
                            description="Browse and manage all your published articles."
                            href="/blog" // Link to the public blog for now
                        />
                        <DashboardActionCard
                            icon={<BarChart3 className="h-8 w-8 text-accent" />}
                            title="Analytics (Coming Soon)"
                            description="Track your blog's performance and visitor engagement."
                            href="#"
                            disabled
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

interface DashboardActionCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    href: string;
    disabled?: boolean;
}

function DashboardActionCard({ icon, title, description, href, disabled }: DashboardActionCardProps) {
    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
                {icon}
                <CardTitle className="text-xl">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{description}</p>
                <Button asChild disabled={disabled} className="w-full">
                    <Link href={href}>{disabled ? "Coming Soon" : "Go to Tool"}</Link>
                </Button>
            </CardContent>
        </Card>
    );
}
