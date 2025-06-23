
import type { Metadata } from 'next';
import Link from 'next/link';
import { Bot, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';


export const metadata: Metadata = {
    title: 'Admin Panel - RoboSapienZ',
    description: 'Manage your RoboSapienZ blog and SEO settings.',
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col">
            {/* Mobile header - This might be adjusted or removed if no sidebar trigger is needed */}
            <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-background px-4 md:hidden">
                {/* <SidebarTrigger asChild>
              <Button size="icon" variant="outline" className="h-8 w-8">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
              </Button>
          </SidebarTrigger> */}
                <Link href="/admin" className="flex items-center gap-2 font-headline text-lg font-semibold text-foreground">
                    <Bot className="h-6 w-6 text-accent" />
                    RoboSapienZ Admin
                </Link>
            </header>

            <main className="flex-grow p-4 md:p-6 bg-background overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
