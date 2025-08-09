import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { cn } from "@/lib/utils";
import * as XLSX from "xlsx";

// Accordion components from Radix
const Accordion = AccordionPrimitive.Root;
const AccordionItem = AccordionPrimitive.Item;
const AccordionTrigger = AccordionPrimitive.Trigger;
const AccordionContent = AccordionPrimitive.Content;

// College type
type College = {
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
};

export default function CollegeDetails() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortByRank, setSortByRank] = useState(false);

  // Handle Excel file upload and parse
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(sheet);

      const mapped: College[] = jsonData.map((item: any, index: number) => ({
        id: String(index + 1),
        name: item.name || "Unnamed College",
        location: item.location || "",
        state: item.state || "",
        type: item.type || "Medical",
        establishedYear: Number(item.establishedYear) || 2000,
        rating: Number(item.rating) || 0,
        fees: item.fees || "N/A",
        branches: item.branches ? String(item.branches).split(",") : [],
        rank: Number(item.rank) || index + 1,
      }));

      setColleges(mapped);
    };

    reader.readAsArrayBuffer(file);
  };

  // Filter + sort logic
  const filteredColleges = [...colleges]
    .filter((college) =>
      college.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => (sortByRank ? a.rank - b.rank : 0));

  return (
    <div className="p-4 space-y-4">
      {/* Top bar with search, upload, and sort */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <Input
          placeholder="Search Colleges..."
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Input type="file" accept=".xlsx" onChange={handleFileUpload} />
        <Button onClick={() => setSortByRank((prev) => !prev)}>
          {sortByRank ? "Unsort" : "Sort by Rank"}
        </Button>
      </div>

      {/* Accordion display */}
      <Accordion type="multiple" className="space-y-2 w-full">
        {filteredColleges.map((college) => (
          <AccordionItem
            key={college.id}
            value={college.id}
            className="border rounded-lg"
          >
            <AccordionTrigger
              className={cn(
                "w-full flex justify-between items-center p-4 text-left font-semibold"
              )}
            >
              <div>
                <h3 className="text-lg">{college.name}</h3>
                <p className="text-sm text-gray-500">
                  {college.location}, {college.state} – Rank: {college.rank}
                </p>
              </div>
              <ChevronDown className="h-5 w-5 transition-transform" />
            </AccordionTrigger>

            <AccordionContent>
              <Card className="bg-muted">
                <CardContent className="p-4 space-y-1 text-sm">
                  <p>
                    <strong>Type:</strong> {college.type}
                  </p>
                  <p>
                    <strong>Established:</strong> {college.establishedYear}
                  </p>
                  <p>
                    <strong>Rating:</strong> {college.rating}
                  </p>
                  <p>
                    <strong>Fees:</strong> {college.fees}
                  </p>
                  <p>
                    <strong>Branches:</strong> {college.branches.join(", ")}
                  </p>
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
