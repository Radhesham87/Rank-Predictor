import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Phone } from 'lucide-react';

interface College {
  id: string;
  name: string;
  location: string;
  state: string;
  rating: number;
  fees: string;
  cutoffRank: number;
  phone?: string;
  branches?: string[];
}

interface CollegeMapProps {
  colleges: College[];
  selectedCollege?: College;
}

// Sample coordinates for cities - in real app this would come from a proper geocoding service
const cityCoordinates: Record<string, { lat: number; lng: number; displayName: string }> = {
  'New Delhi': { lat: 28.6139, lng: 77.2090, displayName: 'New Delhi, Delhi' },
  'Mumbai': { lat: 19.0760, lng: 72.8777, displayName: 'Mumbai, Maharashtra' },
  'Vellore': { lat: 12.9165, lng: 79.1325, displayName: 'Vellore, Tamil Nadu' },
  'Manipal': { lat: 13.3409, lng: 74.7421, displayName: 'Manipal, Karnataka' },
  'Pilani': { lat: 28.3670, lng: 75.6032, displayName: 'Pilani, Rajasthan' },
  'Tiruchirappalli': { lat: 10.7905, lng: 78.7047, displayName: 'Tiruchirappalli, Tamil Nadu' },
  'Kolkata': { lat: 22.5726, lng: 88.3639, displayName: 'Kolkata, West Bengal' },
  'Pune': { lat: 18.5204, lng: 73.8567, displayName: 'Pune, Maharashtra' },
  'Lucknow': { lat: 26.8467, lng: 80.9462, displayName: 'Lucknow, Uttar Pradesh' },
};

const CollegeMap: React.FC<CollegeMapProps> = ({ colleges }) => {
  // Group colleges by location
  const collegesByLocation = colleges.reduce((acc, college) => {
    const location = college.location;
    if (!acc[location]) {
      acc[location] = [];
    }
    acc[location].push(college);
    return acc;
  }, {} as Record<string, College[]>);

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <p className="text-muted-foreground">
          Interactive map view showing all medical colleges across India
        </p>
      </div>
      
      {/* Interactive Map Placeholder */}
      <div className="h-[400px] w-full rounded-lg overflow-hidden border bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-4">
            <MapPin className="h-16 w-16 text-blue-500 mx-auto" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Interactive College Map</h3>
              <p className="text-muted-foreground">
                Map view will show precise locations of all colleges
              </p>
            </div>
          </div>
        </div>
        
        {/* Location markers overlay */}
        <div className="absolute inset-0 pointer-events-none">
          {Object.entries(cityCoordinates).map(([city, coords]) => {
            const collegesInCity = collegesByLocation[city] || [];
            if (collegesInCity.length === 0) return null;
            
            // Convert lat/lng to percentage positions (simplified)
            const x = ((coords.lng + 180) / 360) * 100;
            const y = ((90 - coords.lat) / 180) * 100;
            
            return (
              <div
                key={city}
                className="absolute pointer-events-auto"
                style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
              >
                <div className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold cursor-pointer hover:bg-red-600 transition-colors">
                  {collegesInCity.length}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Location-wise College Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(collegesByLocation).map(([location, collegesInLocation]) => {
          const coordinates = cityCoordinates[location];
          
          return (
            <Card key={location} className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <MapPin className="h-5 w-5 text-blue-500" />
                  {coordinates?.displayName || location}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {collegesInLocation.length} college{collegesInLocation.length !== 1 ? 's' : ''} found
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {collegesInLocation.map((college) => (
                  <div key={college.id} className="p-3 border rounded-lg space-y-2">
                    <h4 className="font-semibold text-sm line-clamp-2">{college.name}</h4>
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{college.rating}/5</span>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">NEET Cutoff: {college.cutoffRank}</p>
                      <p className="text-xs text-muted-foreground">Fees: {college.fees}</p>
                      {college.phone && (
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          <span className="text-xs">{college.phone}</span>
                        </div>
                      )}
                    </div>
                    {college.branches && (
                      <div className="flex flex-wrap gap-1">
                        {college.branches.slice(0, 3).map((branch) => (
                          <Badge key={branch} variant="secondary" className="text-xs">
                            {branch}
                          </Badge>
                        ))}
                        {college.branches.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{college.branches.length - 3} more
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default CollegeMap;