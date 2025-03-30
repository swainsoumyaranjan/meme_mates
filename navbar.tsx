import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed w-full z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 text-primary">
              <Link href="/home" className="text-2xl font-bold font-heading">
                Meme<span className="text-secondary">Mates</span>
              </Link>
            </div>
          </div>
          
          <nav className="hidden md:flex space-x-8 items-center">
            <Link href="/home" className="text-neutral-600 hover:text-primary font-medium transition-colors">Home</Link>
            <div className="flex space-x-2">
              <Link href="/login" className="text-neutral-600 hover:text-primary font-medium transition-colors">
                Login
              </Link>
              <Link href="/register">
                <Button className="bg-primary text-white hover:bg-primary/90">Register</Button>
              </Link>
            </div>
          </nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMobileMenu}
              className="text-neutral-600 hover:text-primary focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-white p-4 shadow-lg rounded-b-lg`}>
          <div className="flex flex-col space-y-4 pb-3 pt-2">
            <Link href="/home" onClick={closeMobileMenu} className="text-neutral-600 hover:text-primary font-medium transition-colors block px-3 py-2 rounded-md">
              Home
            </Link>
            <Link href="/login" onClick={closeMobileMenu} className="text-neutral-600 hover:text-primary font-medium transition-colors block px-3 py-2 rounded-md">
              Login
            </Link>
            <Link href="/register" onClick={closeMobileMenu}>
              <Button className="bg-primary text-white hover:bg-primary/90 w-full">Register</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
