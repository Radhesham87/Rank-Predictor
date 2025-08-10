import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    document.title = "Login / Sign Up - College Finder";

    // Redirect if already signed in
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) navigate("/", { replace: true });
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate("/", { replace: true });
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleAuth = async () => {
    if (!email || !email.includes('@')) {
      toast({ title: "Invalid email", description: "Please enter a valid email address", variant: "destructive" });
      return;
    }
    if (!password || password.length < 6) {
      toast({ title: "Invalid password", description: "Password must be at least 6 characters", variant: "destructive" });
      return;
    }
    if (isSignUp && (!username || username.trim().length < 2)) {
      toast({ title: "Invalid username", description: "Please enter a valid username (at least 2 characters)", variant: "destructive" });
      return;
    }
    
    setLoading(true);
    
    try {
      if (isSignUp) {
        // Sign up new user
        const { error } = await supabase.auth.signUp({
          email: email,
          password: password,
          options: {
            data: {
              full_name: username
            }
          }
        });
        
        if (error) throw error;
        toast({ title: "Account created!", description: "You can now log in with your credentials" });
        setIsSignUp(false);
      } else {
        // Sign in existing user
        const { error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password
        });
        
        if (error) throw error;
        toast({ title: "Welcome back!", description: "Successfully logged in" });
        navigate("/", { replace: true });
      }
    } catch (error: any) {
      toast({ 
        title: isSignUp ? "Sign up failed" : "Login failed", 
        description: error.message, 
        variant: "destructive" 
      });
    }
    
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-md">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Medical College Finder</CardTitle>
            <p className="text-center text-muted-foreground">{isSignUp ? 'Create Account' : 'Welcome Back'}</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {isSignUp && (
                <div>
                  <label htmlFor="username" className="text-sm font-medium">Full Name</label>
                  <Input 
                    id="username" 
                    type="text" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    placeholder="Enter your full name"
                    className="mt-1"
                  />
                </div>
              )}
              <div>
                <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                <Input 
                  id="email" 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="Enter your email address"
                  className="mt-1"
                />
              </div>
              <div>
                <label htmlFor="password" className="text-sm font-medium">Password</label>
                <Input 
                  id="password" 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="Enter your password"
                  className="mt-1"
                />
              </div>
              <Button className="w-full" onClick={handleAuth} disabled={loading}>
                {loading ? (isSignUp ? "Creating Account..." : "Signing In...") : (isSignUp ? "Create Account" : "Sign In")}
              </Button>
              <Button 
                variant="ghost" 
                className="w-full" 
                onClick={() => setIsSignUp(!isSignUp)}
              >
                {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Auth;
