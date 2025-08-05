import { useState } from "react";
import { Menu, X, User, Heart, GitCompare, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Find Colleges", href: "#colleges" },
    { label: "Compare", href: "#compare", icon: GitCompare },
    { label: "Wishlist", href: "#wishlist", icon: Heart },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 w-full z-40 bg-white/90 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CF</span>
            </div>
            <span className="text-xl font-bold text-foreground">CollegeFinder</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium flex items-center gap-1"
              >
                {item.icon && <item.icon className="w-4 h-4" />}
                {item.label}
              </a>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="text-muted-foreground hover:text-primary">
              <LogIn className="w-4 h-4 mr-2" />
              Login
            </Button>
            <Button className="bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary text-primary-foreground">
              <User className="w-4 h-4 mr-2" />
              Sign Up
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-6 mt-8">
                  {navItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="text-lg font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.icon && <item.icon className="w-5 h-5" />}
                      {item.label}
                    </a>
                  ))}
                  
                  <div className="border-t pt-6 space-y-4">
                    <Button variant="outline" className="w-full justify-start">
                      <LogIn className="w-4 h-4 mr-2" />
                      Login
                    </Button>
                    <Button className="w-full justify-start bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary text-primary-foreground">
                      <User className="w-4 h-4 mr-2" />
                      Sign Up
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};