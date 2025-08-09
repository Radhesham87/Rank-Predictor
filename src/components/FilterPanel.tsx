import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";

interface FilterPanelProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const FilterPanel = ({ isOpen, onToggle }: FilterPanelProps) => {
  const states = [
    "Andhra Pradesh", "Karnataka", "Tamil Nadu", "Maharashtra", "Delhi",
    "Uttar Pradesh", "West Bengal", "Gujarat", "Rajasthan", "Haryana",
  ];

  const categories = ["General", "OBC", "SC", "ST", "EWS"];

  if (!isOpen) {
    return (
      <Button
        onClick={onToggle}
        variant="outline"
        className="fixed top-4 left-4 z-50 bg-white/90 backdrop-blur-sm"
      >
        <Filter className="w-4 h-4 mr-2" />
        Filters
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:relative lg:bg-transparent lg:backdrop-blur-none">
      <Card className="absolute left-0 top-0 h-full w-80 bg-background border-r overflow-y-auto lg:relative lg:w-full lg:h-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold">Filters</CardTitle>
          <Button variant="ghost" size="sm" onClick={onToggle}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">

          {/* NEET Input */}
          <div>
            <Label className="text-sm font-medium mb-3 block">NEET Score</Label>
            <div className="space-y-2">
              <Input 
                placeholder="Enter your NEET Score" 
                type="number" 
                className="text-center"
                max="720"
                min="0"
              />
              <p className="text-xs text-muted-foreground">
                Enter your NEET score (0-720) to find matching colleges
              </p>
            </div>
          </div>

          <Separator />

          {/* Category Selection */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Category</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat.toLowerCase()}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* College Type */}
          <div>
            <Label className="text-sm font-medium mb-3 block">College Type</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="government" />
                <Label htmlFor="government" className="text-sm">Government</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="private" />
                <Label htmlFor="private" className="text-sm">Private</Label>
              </div>
            </div>
          </div>

          <Separator />

          {/* State Selection */}
          <div>
            <Label className="text-sm font-medium mb-3 block">State</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent>
                {states.map((state) => (
                  <SelectItem key={state} value={state.toLowerCase()}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Additional Filters */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Additional Filters</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="hostel" />
                <Label htmlFor="hostel" className="text-sm">Hostel Available</Label>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-4">
            <Button className="w-full" onClick={() => { toast({ title: "Filters applied", description: "Results updated (demo)" }); onToggle(); }}>Apply Filters</Button>
            <Button variant="outline" className="w-full" onClick={() => { toast({ title: "Filters cleared" }); onToggle(); }}>Clear All</Button>
          </div>

        </CardContent>
      </Card>
    </div>
  );
};
