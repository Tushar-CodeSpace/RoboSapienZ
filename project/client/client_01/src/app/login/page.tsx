
'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Loader2, LockKeyhole } from 'lucide-react';

const formSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

type FormData = z.infer<typeof formSchema>;

// Placeholder for actual login logic
async function handleLogin(data: FormData) {
    console.log("Login attempt with:", data);
    // In a real app, this would involve calling an authentication API
    // For now, simulate a delay and success/failure
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate a successful login for a specific email for demonstration
    if (data.email === "test@example.com" && data.password === "password123") {
        return { success: true, message: "Login successful!" };
    }
    return { success: false, message: "Invalid email or password." };
}

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const router = useRouter();

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        setIsLoading(true);
        try {
            const result = await handleLogin(data);
            if (result.success) {
                toast({
                    title: "Login Successful!",
                    description: "Welcome back to RoboSapienZ.",
                });
                router.push('/admin'); // Redirect to admin or dashboard after login
            } else {
                toast({
                    variant: "destructive",
                    title: "Login Failed",
                    description: result.message,
                });
            }
        } catch (error) {
            console.error("Login error:", error);
            toast({
                variant: "destructive",
                title: "Login Error",
                description: "An unexpected error occurred. Please try again.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-200px)] py-12">
            <Card className="w-full max-w-md shadow-xl">
                <CardHeader className="text-center">
                    <div className="mx-auto bg-accent/10 p-3 rounded-full w-fit mb-3">
                        <LockKeyhole className="h-10 w-10 text-accent" />
                    </div>
                    <CardTitle className="font-headline text-3xl">Login to RoboSapienZ</CardTitle>
                    <CardDescription>
                        Enter your credentials to access your account.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-lg">Email Address</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="you@example.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-lg">Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="••••••••" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" disabled={isLoading} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6">
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Logging In...
                                    </>
                                ) : (
                                    'Login'
                                )}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className="flex flex-col items-center space-y-3 pt-6">
                    <Link href="/forgot-password" passHref>
                        <Button variant="link" className="text-sm text-accent p-0 hover:underline">
                            Forgot Password?
                        </Button>
                    </Link>
                    <p className="text-sm text-muted-foreground">
                        Don&apos;t have an account?{' '}
                        <Link href="/signup" passHref>
                            <Button variant="link" className="text-accent p-0 hover:underline font-semibold">
                                Sign Up
                            </Button>
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
