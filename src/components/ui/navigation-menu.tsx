"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { Input } from "@/components/ui/input"
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog"

interface NavigationMenuProps {
  onFindColleges?: () => void;
  onSortByRank?: () => void;
}

export function NavigationMenu({ onFindColleges, onSortByRank }: NavigationMenuProps) {
  const [search, setSearch] = React.useState("");
  const [showLogin, setShowLogin] = React.useState(false);
  const [showSignup, setShowSignup] = React.useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSortClick = () => {
    if (onSortByRank) onSortByRank();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="text-xl font-bold">CollegeFinder</Link>

        <nav className="hidden md:flex items-center space-x-4">
          <Input
            type="text"
            placeholder="Search for colleges..."
            value={search}
            onChange={handleSearch}
            className="w-64"
          />
          <Button onClick={onFindColleges}>Find Colleges</Button>
          <Button variant="outline" onClick={handleSortClick}>Sort by Rank</Button>

          {/* LOGIN Modal */}
          <AlertDialog open={showLogin} onOpenChange={setShowLogin}>
            <AlertDialogTrigger asChild>
              <Button variant="outline">Login</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Login</AlertDialogTitle>
                <AlertDialogDescription>
                  This is a placeholder login form.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <Input placeholder="Email" className="mb-2" />
              <Input placeholder="Password" type="password" />
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Login</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/* SIGNUP Modal */}
          <AlertDialog open={showSignup} onOpenChange={setShowSignup}>
            <AlertDialogTrigger asChild>
              <Button>Sign up</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Sign Up</AlertDialogTitle>
                <AlertDialogDescription>
                  This is a placeholder sign up form.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <Input placeholder="Email" className="mb-2" />
              <Input placeholder="Password" type="password" className="mb-2" />
              <Input placeholder="Confirm Password" type="password" />
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Sign Up</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </nav>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="space-y-4 p-4">
              <Input
                type="text"
                placeholder="Search for colleges..."
                value={search}
                onChange={handleSearch}
              />
              <Button onClick={onFindColleges}>Find Colleges</Button>
              <Button variant="outline" onClick={handleSortClick}>Sort by Rank</Button>
              <Button variant="outline" onClick={() => setShowLogin(true)}>Login</Button>
              <Button onClick={() => setShowSignup(true)}>Sign up</Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
