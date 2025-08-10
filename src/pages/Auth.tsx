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
  const [username, setUsername] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
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

  const handleSendOtp = async () => {
    if (!email || !email.includes('@')) {
      toast({ title: "Invalid email", description: "Please enter a valid email address", variant: "destructive" });
      return;
    }
    if (!username || username.trim().length < 2) {
      toast({ title: "Invalid username", description: "Please enter a valid username (at least 2 characters)", variant: "destructive" });
      return;
    }
    
    setLoading(true);
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signInWithOtp({ 
      email: email,
      options: {
        emailRedirectTo: redirectUrl
      }
    });
    
    setLoading(false);
    if (error) {
      toast({ title: "Failed to send OTP", description: error.message, variant: "destructive" });
    } else {
      setOtpSent(true);
      toast({ title: "OTP sent", description: "Please check your email for the verification code" });
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      toast({ title: "Invalid OTP", description: "Please enter the 6-digit OTP", variant: "destructive" });
      return;
    }
    
    setLoading(true);
    const { error } = await supabase.auth.verifyOtp({
      email: email,
      token: otp,
      type: 'email'
    });
    
    setLoading(false);
    if (error) {
      toast({ title: "OTP verification failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Welcome!", description: "Successfully logged in" });
      navigate("/", { replace: true });
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-md">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Medical College Finder</CardTitle>
            <p className="text-center text-muted-foreground">Login with Email Address</p>
          </CardHeader>
          <CardContent>
            {!otpSent ? (
              <div className="space-y-4">
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
                <Button className="w-full" onClick={handleSendOtp} disabled={loading}>
                  {loading ? "Sending OTP..." : "Send OTP"}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label htmlFor="otp" className="text-sm font-medium">Enter OTP</label>
                  <Input 
                    id="otp" 
                    type="text" 
                    value={otp} 
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))} 
                    placeholder="Enter 6-digit OTP"
                    maxLength={6}
                    className="text-center text-lg tracking-widest"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    OTP sent to {email}
                  </p>
                </div>
                <Button className="w-full" onClick={handleVerifyOtp} disabled={loading}>
                  {loading ? "Verifying..." : "Verify OTP"}
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full" 
                  onClick={() => { setOtpSent(false); setOtp(""); setUsername(""); }}
                >
                  Change Details
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Auth;
