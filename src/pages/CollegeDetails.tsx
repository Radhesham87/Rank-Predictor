import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Calendar, Phone, Globe, ArrowLeft } from "lucide-react";
import axios from "axios";

interface College {
  id: string;
  name: string;
  location: string;
  state: string;
  type: string;
  establishedYear: number;
  rating: number;
  fees: string;
  branches: string[];
  rank: number;
  cutoffRank: number;
  quota: string;
  category: string;
  hostelAvailable: boolean;
  phone: string;
  website: string;
  image: string;
}

const CollegeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [college, setCollege] = useState<College | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get<College[]>("http://localhost:5000/api/colleges")
      .then((res) => {
        const found = res.data.find((c) => c.id === id);
        setCollege(found || null);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (college) {
      document.title = `${college.name} | College Details`;

      const desc = document.querySelector('meta[name="description"]') || document.createElement('meta');
      desc.setAttribute('name', 'description');
      desc.setAttribute('content', `Explore details, fees, branches, and contact info for ${college.name}.`);
      if (!desc.parentElement) document.head.appendChild(desc);

      const canonical = document.querySelector('link[rel="canonical"]') || document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      canonical.setAttribute('href', window.location.href);
      if (!canonical.parentElement) document.head.appendChild(canonical);
    }
  }, [college]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Loading college details...</p>
      </div>
    );
  }

  if (!college) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 pt-24 pb-16">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
            <ArrowLeft className="mr-2" /> Back
          </Button>
          <Card>
            <CardHeader>
              <CardTitle>College not found</CardTitle>
            </CardHeader>
            <CardContent>
              We couldn't find the college you're looking for.
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="mr-2" /> Back
        </Button>

        <article className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <section className="lg:col-span-2 space-y-6">
            <Card>
              <img src={college.image} alt={`${college.name} campus`} className="w-full h-64 object-cover rounded-t-lg" loading="lazy" />
              <CardHeader>
                <CardTitle className="text-3xl">{college.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <div className="flex items-center"><MapPin className="w-4 h-4 mr-2" />{college.location}, {college.state}</div>
                <div className="flex items-center"><Calendar className="w-4 h-4 mr-2" />Established {college.establishedYear}</div>
                <div className="flex items-center"><Star className="w-4 h-4 mr-2 text-secondary" />Rating {college.rating}/5</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Branches</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-1">
                  {college.branches.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          <aside className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>At a glance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between"><span>Type</span><span>{college.type}</span></div>
                <div className="flex justify-between"><span>Annual Fees</span><span className="font-semibold text-primary">{college.fees}</span></div>
                <div className="flex justify-between"><span>Cutoff Rank</span><span>{college.cutoffRank.toLocaleString()}</span></div>
                <div className="flex justify-between"><span>Quota</span><span>{college.quota}</span></div>
                <div className="flex justify-between"><span>Category</span><span>{college.category}</span></div>
                <div className="flex justify-between"><span>Hostel</span><span>{college.hostelAvailable ? 'Available' : 'Not Available'}</span></div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-3">
              <Button asChild variant="outline">
                <a href={`tel:${college.phone}`} aria-label={`Call ${college.name}`}>
                  <Phone className="mr-2" /> Call
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href={college.website} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${college.name} website`}>
                  <Globe className="mr-2" /> Visit
                </a>
              </Button>
            </div>
          </aside>
        </article>
      </main>
    </div>
  );
};

export default CollegeDetails;
