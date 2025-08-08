"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronDown, LogIn, UserPlus, SortAsc } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface NavigationMenuProps {
  onSortByRank?: () => void;
}

export const NavigationMenuBar: React.FC<NavigationMenuProps> = ({
  onSortByRank,
}) => {
  const [sortOrder, setSortOrder] = React.useState<string>("asc");

  const handleSortChange = (value: string) => {
    setSortOrder(value);
    if (onSortByRank) {
      onSortByRank(); // Pass to parent if needed
    }
  };

  return (
    <div className="flex justify-between items-center p-4 border-b shadow-sm bg-white">
      <NavigationMenu>
        <NavigationMenuList className="flex gap-6 items-center">
          <NavigationMenuItem>
            <Link href="/" className="text-lg font-semibold">
              College Finder
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Select value={sortOrder} onValueChange={handleSortChange}>
              <SelectTrigger className="w-[180px]">
                <SortAsc className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Sort by Rank" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">Rank: Low to High</SelectItem>
                <SelectItem value="desc">Rank: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="flex gap-4">
        {/* Login Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <LogIn className="mr-2 h-4 w-4" />
              Login
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Login</DialogTitle>
            </DialogHeader>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border rounded"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 border rounded"
              />
              <Button className="w-full">Submit</Button>
            </form>
          </DialogContent>
        </Dialog>

        {/* Sign Up Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Sign Up
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Sign Up</DialogTitle>
            </DialogHeader>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-2 border rounded"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border rounded"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 border rounded"
              />
              <Button className="w-full">Register</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
