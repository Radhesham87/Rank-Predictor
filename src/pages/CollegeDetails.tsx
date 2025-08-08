import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { cn } from "@/lib/utils";
import * as XLSX from "xlsx";

// Sample type
type College = {
  id: string;
  name: string;
  location: string;
  state: string;
  type: "Medical" | "Engineering" | "Nursing";
  establishedYear: number;
  rating: number;
  fees: string;
  branches: string[];
  rank: number;
};

const Accordion = AccordionPrimitive.Root;
const AccordionItem = AccordionPrimitive.Item;
const AccordionTrigger = AccordionPrimitive.Trigger;
const AccordionContent = AccordionPrimitive.Content;

export default function CollegeDetails() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortByRank, setSortByRank] = useState(false);

  // Load data from Excel
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet);

      const mapped: College[] = jsonData.map((item: any, index: number) => ({
        id: String(index + 1),
        name: item.name,
        location: item.location,
        state: item.state,
        type: item.type,
        establishedYear: Number(item.establishedYear),
        rating: Number(item.rating),
        fees: item.fees,
        branches: item.branches ? item.branches.split(",") : [],
        rank: Number(item.rank) || index + 1,
      }));

      setColleges(mapped);
    };

    reader.readAsArrayBuffer(file);
  };

  const filteredColleges = colleges
    .filter((college) =>
      college.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => (sortByRank ? a.rank - b.rank : 0));

  return (
    <div className="p-4 space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <Input
          placeholder="Search Colleges..."
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Input type="file" accept=".xlsx" onChange={handleFileUpload} />
        <Button onClick={() => setSortByRank(!sortByRank)}>
          {sortByRank ? "Unsort" : "Sort by Rank"}
        </Button>
        <div className="flex gap-2">
          <Button onClick={() => alert("Login logic here")}>Login</Button>
          <Button onClick={() => alert("Signup logic here")}>Sign Up</Button>
        </div>
      </div>

      <Accordion type="multiple" className="space-y-2">
        {filteredColleges.map((college) => (
          <AccordionItem
            key={college.id}
            value={college.id}
            className="rounded-lg border"
          >
            <AccordionTrigger className="flex justify-between w-full p-4 text-left">
              <div>
                <h3 className="text-lg font-semibold">{college.name}</h3>
                <p className="text-sm text-gray-500">
                  {college.location}, {college.state} – Rank: {college.rank}
                </p>
              </div>
              <ChevronDown className="h-5 w-5 transition-transform" />
            </AccordionTrigger>
            <AccordionContent>
              <Card className="bg-gray-50">
                <CardContent className="p-4 text-sm space-y-2">
                  <p><strong>Type:</strong> {college.type}</p>
                  <p><strong>Established:</strong> {college.establishedYear}</p>
                  <p><strong>Rating:</strong> {college.rating}</p>
                  <p><strong>Fees:</strong> {college.fees}</p>
                  <p><strong>Branches:</strong> {college.branches.join(", ")}</p>
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
