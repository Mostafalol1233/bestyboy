import { useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { apiRequest } from "@/lib/queryClient";

const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Admin() {
  const [, navigate] = useLocation();
  const { isAuthenticated, isAdmin, login, user } = useAuth();
  const { toast } = useToast();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      navigate("/");
      toast({
        title: "Already authenticated",
        description: "You're already logged in as an admin.",
      });
    } else if (isAuthenticated && !isAdmin) {
      toast({
        variant: "destructive",
        title: "Access Denied",
        description: "You don't have admin privileges.",
      });
      navigate("/");
    }
  }, [isAuthenticated, isAdmin, navigate, toast]);

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await login(data);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error.message || "Invalid credentials. Please try again.",
      });
    }
  };

  return (
    <div className="container mx-auto py-10 flex justify-center items-center min-h-[80vh]">
      <Card className="w-full max-w-md border border-purple-900 shadow-[0_0_25px_rgba(124,58,237,0.15)]">
        <CardHeader>
          <CardTitle className="font-orbitron text-3xl text-center neon-text">
            <span className="text-purple-500">Highway</span>
            <span className="text-red-500">Gaming</span>
          </CardTitle>
          <CardDescription className="text-center flex items-center justify-center gap-2">
            <span className="bg-purple-500/20 p-1 rounded">🔒</span> Admin Access
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="admin" {...field} />
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full gaming-btn" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Logging in..." : "Login"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-purple-500">
            Default credentials: <span className="font-mono bg-gray-800 px-2 py-1 rounded">admin / admin123</span>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
