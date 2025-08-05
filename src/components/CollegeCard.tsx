import { MapPin, Phone, Globe, Star, Users, Calendar, Heart, GitCompare } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface CollegeCardProps {
  college: {
    id: string;
    name: string;
    location: string;
    state: string;
    type: "Medical" | "Engineering";
    establishedYear: number;
    rating: number;
    fees: string;
    branches: string[];
    cutoffRank: number;
    quota: string;
    category: string;
    hostelAvailable: boolean;
    website: string;
    phone: string;
    image: string;
  };
}

export const CollegeCard = ({ college }: CollegeCardProps) => {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-card to-muted/30 border-border/50">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg h-48">
          <img 
            src={college.image} 
            alt={college.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 right-4 flex gap-2">
            <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
              <Heart className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
              <GitCompare className="w-4 h-4" />
            </Button>
          </div>
          <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
            {college.type}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
            {college.name}
          </h3>
          <div className="flex items-center text-muted-foreground mb-2">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm">{college.location}, {college.state}</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              <span>Est. {college.establishedYear}</span>
            </div>
            <div className="flex items-center">
              <Star className="w-4 h-4 mr-1 text-secondary" />
              <span>{college.rating}/5</span>
            </div>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-muted-foreground">Annual Fees:</span>
            <span className="font-semibold text-primary">{college.fees}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-muted-foreground">Cutoff Rank:</span>
            <Badge variant="outline" className="font-semibold">
              {college.cutoffRank.toLocaleString()}
            </Badge>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-muted-foreground">Quota:</span>
            <span className="text-sm">{college.quota}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-muted-foreground">Category:</span>
            <span className="text-sm">{college.category}</span>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm font-medium text-muted-foreground mb-2">Available Branches:</p>
          <div className="flex flex-wrap gap-1">
            {college.branches.slice(0, 3).map((branch) => (
              <Badge key={branch} variant="secondary" className="text-xs">
                {branch}
              </Badge>
            ))}
            {college.branches.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{college.branches.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="w-4 h-4 mr-1" />
            <span>Hostel: {college.hostelAvailable ? "Available" : "Not Available"}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button className="flex-1" size="sm">
            View Details
          </Button>
          <Button variant="outline" size="sm" className="flex items-center">
            <Globe className="w-4 h-4 mr-1" />
            Visit
          </Button>
          <Button variant="outline" size="sm" className="flex items-center">
            <Phone className="w-4 h-4 mr-1" />
            Call
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};