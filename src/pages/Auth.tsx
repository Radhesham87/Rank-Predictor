import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const [phone, setPhone] = useState("");
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
    if (!phone || phone.length < 10) {
      toast({ title: "Invalid phone number", description: "Please enter a valid 10-digit phone number", variant: "destructive" });
      return;
    }
    if (!username || username.trim().length < 2) {
      toast({ title: "Invalid username", description: "Please enter a valid username (at least 2 characters)", variant: "destructive" });
      return;
    }
    
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ 
      phone: `+91${phone}`,
      options: {
        channel: 'sms'
      }
    });
    
    setLoading(false);
    if (error) {
      toast({ title: "Failed to send OTP", description: error.message, variant: "destructive" });
    } else {
      setOtpSent(true);
      toast({ title: "OTP sent", description: "Please check your phone for the verification code" });
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      toast({ title: "Invalid OTP", description: "Please enter the 6-digit OTP", variant: "destructive" });
      return;
    }
    
    setLoading(true);
    const { error } = await supabase.auth.verifyOtp({
      phone: `+91${phone}`,
      token: otp,
      type: 'sms'
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
            <p className="text-center text-muted-foreground">Login with Mobile Number</p>
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
                  <label htmlFor="phone" className="text-sm font-medium">Mobile Number</label>
                  <div className="flex mt-1">
                    <span className="inline-flex items-center px-3 border border-r-0 border-border rounded-l-md bg-muted text-sm">
                      +91
                    </span>
                    <Input 
                      id="phone" 
                      type="tel" 
                      value={phone} 
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))} 
                      placeholder="Enter 10-digit mobile number"
                      className="rounded-l-none"
                      maxLength={10}
                    />
                  </div>
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
                    OTP sent to +91{phone}
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
