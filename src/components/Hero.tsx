import { Search, Users, Award, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export const Hero = ({ onFindColleges }: { onFindColleges?: () => void }) => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-primary via-primary-light to-accent overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-secondary rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-light rounded-full blur-3xl"></div>
      </div>

      <div className="relative container mx-auto px-4 py-20">
        {/* Heading */}
        <div className="text-center text-primary-foreground mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Find Your Perfect
            <span className="block bg-gradient-to-r from-secondary to-secondary-light bg-clip-text text-transparent">
              College Match
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
            Discover Medical and Engineering colleges tailored to your rank, preferences, and dreams. 
            Make informed decisions with real-time cutoff data and comprehensive insights.
          </p>
        </div>

        {/* Search Card */}
        <div className="max-w-5xl mx-auto mb-16">
          <Card className="p-8 backdrop-blur-md bg-white/10 border-white/20 shadow-2xl">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-primary-foreground mb-2">
                Start Your College Search
              </h2>
              <p className="text-primary-foreground/80">
                Enter your exam rank, percentile, NEET marks, AIR, or SML for personalized recommendations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input 
                placeholder="Enter NEET marks (e.g., 650)" 
                className="h-14 text-lg bg-white/20 border-white/30 text-primary-foreground placeholder:text-primary-foreground/60"
              />
              <Input 
                placeholder="Enter NEET AIR" 
                className="h-14 text-lg bg-white/20 border-white/30 text-primary-foreground placeholder:text-primary-foreground/60"
              />
              <Input 
                placeholder="Enter NEET SML" 
                className="h-14 text-lg bg-white/20 border-white/30 text-primary-foreground placeholder:text-primary-foreground/60"
              />
              <Button
                type="button"
                onClick={() => {
                  onFindColleges
                    ? onFindColleges()
                    : document.getElementById("colleges")?.scrollIntoView({ behavior: "smooth" });
                }}
                size="lg"
                className="h-14 px-8 bg-secondary hover:bg-secondary-light text-secondary-foreground font-semibold"
              >
                <Search className="mr-2" />
                Find Colleges
              </Button>
            </div>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Card className="p-6 backdrop-blur-md bg-white/10 border-white/20 text-center text-primary-foreground">
            <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-secondary" />
            </div>
            <h3 className="text-3xl font-bold mb-2">500+</h3>
            <p className="text-primary-foreground/80">Medical & Engineering Colleges</p>
          </Card>

          <Card className="p-6 backdrop-blur-md bg-white/10 border-white/20 text-center text-primary-foreground">
            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-accent-light" />
            </div>
            <h3 className="text-3xl font-bold mb-2">50K+</h3>
            <p className="text-primary-foreground/80">Students Helped</p>
          </Card>

          <Card className="p-6 backdrop-blur-md bg-white/10 border-white/20 text-center text-primary-foreground">
            <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-secondary" />
            </div>
            <h3 className="text-3xl font-bold mb-2">95%</h3>
            <p className="text-primary-foreground/80">Success Rate</p>
          </Card>
        </div>
      </div>
    </div>
  );
};
