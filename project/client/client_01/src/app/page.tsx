
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Zap, CodeXml, Bolt, Wrench, BarChart3, Newspaper, Sparkles, Star, Quote, Handshake } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image'; // Import next/image
import { getAllPosts } from '@/lib/posts';
import { BlogPostCard } from '@/components/BlogPostCard';
import HeadlineWithTyping from '@/components/HeadlineWithTyping';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

export default async function LandingPage() {
    const features = [
        { icon: <Zap className="h-4 w-4" />, text: 'Controls' },
        { icon: <CodeXml className="h-4 w-4" />, text: 'IT' },
        { icon: <Bolt className="h-4 w-4" />, text: 'Electrical' },
        { icon: <Wrench className="h-4 w-4" />, text: 'Mechanical' },
        { icon: <BarChart3 className="h-4 w-4" />, text: 'Data Analytics' },
    ];

    const allPosts = await getAllPosts();
    const featuredPosts = allPosts.slice(0, 3);

    const reviews = [
        {
            name: "Alex R.",
            role: "Automation Engineer",
            avatar: "https://placehold.co/40x40.png",
            avatarFallback: "AR",
            rating: 5,
            text: "RoboSapienZ has become my go-to for complex automation challenges. The articles are incredibly insightful and practical, bridging theory with real-world application seamlessly."
        },
        {
            name: "Sarah K.",
            role: "AI Developer",
            avatar: "https://placehold.co/40x40.png",
            avatarFallback: "SK",
            rating: 5,
            text: "The way this blog connects AI concepts with industrial robotics is unique. It's helped me understand the broader impact of my work and discover new integration possibilities."
        },
        {
            name: "Mike P.",
            role: "Controls Specialist",
            avatar: "https://placehold.co/40x40.png",
            avatarFallback: "MP",
            rating: 4,
            text: "I've found a wealth of knowledge here, especially on the IT and controls side. The content is well-researched and always up-to-date with the latest industry trends."
        },
        {
            name: "Emily L.",
            role: "Robotics Researcher",
            avatar: "https://placehold.co/40x40.png",
            avatarFallback: "EL",
            rating: 5,
            text: "This blog is an invaluable resource for anyone in robotics. The depth of technical content combined with forward-looking perspectives is exactly what the industry needs."
        }
    ];

    const partners = [
        { src: 'https://placehold.co/150x60.png', alt: 'Coca-Cola Logo', hint: 'coca cola' },
        { src: 'https://placehold.co/150x60.png', alt: 'DHL Logo', hint: 'dhl logo' },
        { src: 'https://placehold.co/150x60.png', alt: 'Peka Logo', hint: 'peka logo' },
        { src: 'https://placehold.co/150x60.png', alt: 'Flipkart Logo', hint: 'flipkart logo' },
        { src: 'https://placehold.co/150x60.png', alt: 'ITC Limited Logo', hint: 'itc limited' },
        { src: 'https://placehold.co/150x60.png', alt: 'Mondial Relay Logo', hint: 'mondial relay' },
    ];

    return (
        <>
            <div className="flex flex-col items-center bg-black text-white pt-6 pb-8 px-4 -mt-8">
                <main className="flex flex-col items-center text-center max-w-4xl mx-auto pt-4">
                    <div className="mb-2">
                        <Badge variant="default" className="bg-black hover:bg-black border border-muted-foreground/50 text-sm px-4 py-2 rounded-full inline-flex items-center font-normal">
                            Trusted by 1.5M Tech Geeks
                            <span className="ml-2 flex h-3 w-3 items-center justify-center">
                                <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                            </span>
                        </Badge>
                    </div>

                    <HeadlineWithTyping />

                    <h2 className="text-2xl sm:text-3xl font-medium text-accent">
                        Your Hub for Insights in Industrial Automation, Robotics, and AI.
                    </h2>

                    <p className="text-neutral-300 text-lg max-w-2xl mt-4 mb-6">
                        Bridging the gaps between topics like electrical, mechanical, controls, IT, and AI to explore the integrated future of intelligent systems and advanced manufacturing.
                    </p>

                    <div className="flex flex-wrap justify-center gap-1 mb-6">
                        {features.map((feature, index) => (
                            <Button
                                key={index}
                                variant="outline"
                                className="bg-neutral-800 border-neutral-700 hover:bg-neutral-700 text-neutral-200 px-4 py-2 rounded-full text-sm"
                            >
                                {feature.icon}
                                <span>{feature.text}</span>
                            </Button>
                        ))}
                    </div>

                    <Link href="/blog" passHref>
                        <Button
                            size="lg"
                            className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-10 py-7 text-lg rounded-lg transform hover:scale-105 transition-all"
                        >
                            <Newspaper className="mr-2 h-5 w-5" />
                            Explore Latest Articles
                        </Button>
                    </Link>
                </main>
            </div>

            {featuredPosts.length > 0 && (
                <section className="pt-10 pb-12 bg-background w-full">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl sm:text-4xl font-headline font-bold text-center mb-6 text-foreground flex items-center justify-center gap-3">
                            <Sparkles className="h-8 w-8 text-accent" />
                            Featured Articles
                            <Sparkles className="h-8 w-8 text-accent" />
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {featuredPosts.map((post, index) => {
                                let conditionalClasses: Record<string, boolean> = {};
                                const numPosts = featuredPosts.length;

                                if (index === numPosts - 1) {
                                    if (numPosts === 1) {
                                        conditionalClasses['md:col-span-2'] = true;
                                        conditionalClasses['md:w-1/2'] = true;
                                        conditionalClasses['md:mx-auto'] = true;

                                        conditionalClasses['lg:col-span-3'] = true;
                                        conditionalClasses['lg:w-1/3'] = true;
                                        conditionalClasses['lg:mx-auto'] = true;
                                    } else if (numPosts % 2 !== 0 && numPosts > 1) {
                                        conditionalClasses['md:col-span-2'] = true;
                                        conditionalClasses['md:w-1/2'] = true;
                                        conditionalClasses['md:mx-auto'] = true;
                                    }
                                }

                                if (numPosts === 3) {
                                    conditionalClasses['lg:col-span-1'] = true;
                                    conditionalClasses['lg:w-full'] = true;
                                    conditionalClasses['lg:mx-0'] = true;
                                }

                                return (
                                    <BlogPostCard
                                        key={post.id}
                                        post={post}
                                        className={cn(conditionalClasses, 'bg-card')}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            <section className="pt-10 pb-4 bg-card w-full rounded-lg">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl sm:text-4xl font-headline font-bold text-center mb-6 text-foreground flex items-center justify-center gap-3">
                        <Quote className="h-8 w-8 text-accent transform scale-x-[-1]" />
                        What Our Readers Say
                        <Quote className="h-8 w-8 text-accent transform scale-y-[-1]" />
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {reviews.map((review, index) => (
                            <Card key={index} className="bg-background hover:border-accent border border-transparent transform hover:scale-105 transition-all duration-300 ease-in-out">
                                <CardHeader className="pb-4">
                                    <div className="flex items-center gap-4">
                                        <Avatar className="h-12 w-12">
                                            <AvatarImage src={review.avatar} alt={review.name} data-ai-hint="person avatar" />
                                            <AvatarFallback>{review.avatarFallback}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <CardTitle className="text-lg font-semibold text-foreground">{review.name}</CardTitle>
                                            <p className="text-sm text-muted-foreground">{review.role}</p>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex mb-2">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-sm text-foreground leading-relaxed italic">"{review.text}"</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            <section className="pt-8 pb-4 bg-background w-full">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl sm:text-4xl font-headline font-bold text-center mb-6 text-foreground flex items-center justify-center gap-3">
                        <Handshake className="h-8 w-8 text-accent" />
                        Trusted By Industry Leaders
                        <Handshake className="h-8 w-8 text-accent transform scale-x-[-1]" />
                    </h2>
                    <div className="overflow-hidden w-full">
                        <div className="flex animate-scroll-horizontal pause-animation-on-hover whitespace-nowrap">
                            {/* Render partners twice for seamless scrolling */}
                            {[...partners, ...partners].map((partner, index) => (
                                <div key={`partner-${index}`} className="inline-flex items-center justify-center flex-shrink-0 px-3 sm:px-4 md:px-5 h-10 sm:h-12">
                                    <Image
                                        src={partner.src}
                                        alt={partner.alt}
                                        width={120}
                                        height={40}
                                        className="object-contain max-h-full"
                                        data-ai-hint={partner.hint}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
