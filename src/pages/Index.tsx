import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { FilterPanel } from "@/components/FilterPanel";
import { CollegeCard } from "@/components/CollegeCard";
import { mockColleges } from "@/data/mockColleges";

const Index = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-16" id="colleges">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Discover my GirlFriend for Ravi Panchal
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Browse through hundreds of Medical and Engineering colleges with real-time cutoff data, 
            comprehensive details, and personalized recommendations based on your preferences.
          </p>
        </div>

        <div className="flex gap-8">
          {/* Filter Panel */}
          <div className="hidden lg:block w-80 shrink-0">
            <FilterPanel isOpen={true} onToggle={() => {}} />
          </div>

          {/* Mobile Filter Button */}
          <div className="lg:hidden">
            <FilterPanel isOpen={isFilterOpen} onToggle={() => setIsFilterOpen(!isFilterOpen)} />
          </div>

          {/* College Grid */}
          <div className="flex-1">
            <div className="mb-6 flex justify-between items-center">
              <p className="text-muted-foreground">
                Showing <span className="font-semibold">{mockColleges.length}</span> colleges
              </p>
              <select className="border border-border rounded-md px-3 py-2 text-sm bg-background">
                <option>Sort by Rank</option>
                <option>Sort by Fees</option>
                <option>Sort by Rating</option>
              </select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {mockColleges.map((college) => (
                <CollegeCard key={college.id} college={college} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
