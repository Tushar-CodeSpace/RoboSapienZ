
import type { Metadata } from 'next';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Target, Eye, Brain, Users, Rocket, Lightbulb } from 'lucide-react';

export const metadata: Metadata = {
    title: 'About RoboSapienZ - Our Mission and Vision',
    description: 'Learn about RoboSapienZ, our mission to bridge gaps in industrial automation, robotics, and AI, and our vision for the future of intelligent systems.',
};

export default function AboutUsPage() {
    return (
        <div className="max-w-4xl mx-auto py-8 px-4 space-y-12">
            <header className="text-center space-y-4">
                <div className="inline-block bg-accent/10 p-4 rounded-full">
                    <Users className="h-16 w-16 text-accent" />
                </div>
                <h1 className="text-5xl font-headline font-bold text-foreground">
                    About RoboSapienZ
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Your trusted source for insights and knowledge in industrial automation, robotics, and the ever-evolving world of Artificial Intelligence.
                </p>
            </header>

            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                    <CardTitle className="text-3xl font-headline flex items-center gap-3">
                        <Target className="h-8 w-8 text-primary" />
                        Our Mission
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-lg text-foreground/90">
                    <p>
                        At RoboSapienZ, our mission is to demystify the complexities of modern industrial technologies. We aim to bridge the knowledge gap between disciplines like electrical engineering, mechanical design, control systems, IT infrastructure, and cutting-edge AI.
                    </p>
                    <p>
                        We strive to provide clear, concise, and practical content that empowers professionals, students, and enthusiasts alike to understand, implement, and innovate within these rapidly advancing fields.
                    </p>
                </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-8">
                <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader>
                        <CardTitle className="text-3xl font-headline flex items-center gap-3">
                            <Eye className="h-8 w-8 text-primary" />
                            Our Vision
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-lg text-foreground/90">
                        <p>
                            We envision a future where intelligent systems and automation are seamlessly integrated into every facet of industry, driving unprecedented efficiency, sustainability, and innovation.
                        </p>
                        <p>
                            RoboSapienZ aims to be at the forefront of this transformation, fostering a community of informed and skilled individuals ready to shape the future of manufacturing and technology.
                        </p>
                    </CardContent>
                </Card>

                <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader>
                        <CardTitle className="text-3xl font-headline flex items-center gap-3">
                            <Lightbulb className="h-8 w-8 text-primary" />
                            Why RoboSapienZ?
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-lg text-foreground/90">
                        <ul className="list-disc list-inside space-y-2">
                            <li><span className="font-semibold">Holistic Approach:</span> We connect the dots between various engineering and tech disciplines.</li>
                            <li><span className="font-semibold">Practical Insights:</span> Actionable knowledge you can apply.</li>
                            <li><span className="font-semibold">Future-Focused:</span> Exploring trends that shape tomorrow's industries.</li>
                            <li><span className="font-semibold">Community Driven:</span> A platform for learning, sharing, and growth.</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>

            <section className="text-center py-8">
                <Image
                    src="https://placehold.co/700x300.png"
                    alt="Robotics and AI in action"
                    width={700}
                    height={300}
                    className="rounded-lg mx-auto shadow-md"
                    data-ai-hint="robotics AI industry"
                />
            </section>

            <Card className="text-center bg-card border-accent shadow-xl">
                <CardHeader>
                    <CardTitle className="text-3xl font-headline text-accent flex items-center justify-center gap-3">
                        <Rocket className="h-8 w-8" />
                        Join Our Journey
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-lg text-foreground/90">
                        Whether you're an industry veteran, a curious student, or an AI enthusiast, RoboSapienZ offers valuable content to fuel your passion and knowledge. Explore our articles and become part of a community dedicated to the future of technology.
                    </p>
                    <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                        <Link href="/blog">Explore Our Blog</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
