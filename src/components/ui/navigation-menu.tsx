"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface NavigationProps {
  onSortChange?: (sortType: string) => void;
}

export function NavigationMenuDemo({ onSortChange }: NavigationProps) {
  const [searchValue, setSearchValue] = React.useState("");

  const handleSortChange = (value: string) => {
    if (onSortChange) {
      onSortChange(value);
    }
  };

  return (
    <div className="flex justify-between items-center w-full px-6 py-4 border-b bg-white shadow-sm">
      {/* Logo or Brand */}
      <Link href="/" className="text-2xl font-bold text-blue-600">
        CollegeFinder
      </Link>

      {/* Search Bar */}
      <div className="flex-1 mx-4">
        <Input
          placeholder="Search colleges..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full"
        />
      </div>

      {/* Sort Dropdown */}
      <div className="mx-4">
        <Select onValueChange={handleSortChange}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rank">Rank</SelectItem>
            <SelectItem value="rating">Rating</SelectItem>
            <SelectItem value="fees">Fees</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Auth Buttons */}
      <div className="flex gap-2">
        <Button variant="outline" onClick={() => alert("Login clicked!")}>
          Login
        </Button>
        <Button onClick={() => alert("Sign up clicked!")}>Sign Up</Button>
      </div>
    </div>
  );
}
