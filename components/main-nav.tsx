import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useTheme } from "next-themes";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function MainNav() {
  const { user, error, isLoading } = useUser();
  const { theme } = useTheme()

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={`flex flex-col fixed h-20 w-full shrink-0 items-center px-0 md:px-6 ${inter.className} z-50 py-4 bg-background shadow-md`}>
      <div className="flex items-center justify-between w-full px-4">
        <div className="flex items-center">
          <a href="/">
            <img src="/Logo.png" alt="logo" className={`w-12 h-12 mr-3 bg-black ${
							theme === 'dark' ? 'bg-opacity-0' : 'bg-opacity-10'
						} p-1 rounded-full `}/>
          </a>
          <nav className="hidden md:flex space-x-4">
            <a href="/" className={`${theme == "dark" ? "hover:text-gray-300" : "hover:text-gray-600"} transition-colors`}>
              Home
            </a>
            <a href="/social" className={`${theme == "dark" ? "hover:text-gray-300" : "hover:text-gray-600"} transition-colors`}>
              Social
            </a>
            <a href="/reviews" className={`${theme == "dark" ? "hover:text-gray-300" : "hover:text-gray-600"} transition-colors`}>
              Reviews
            </a>
            <a href="/itineraries" className={`${theme == "dark" ? "hover:text-gray-300" : "hover:text-gray-600"} transition-colors`}>
              My Itineraries
            </a>
            <a href="/flight" className={`${theme == "dark" ? "hover:text-gray-300" : "hover:text-gray-600"} transition-colors`}>
              Flight Tracker
            </a>
          </nav> 
          
        </div>
        <div className="hidden md:flex items-center">
          {!user ? (
            <a href={"/api/auth/login?returnTo=/user/callback"}>
              <Button>Login</Button>
            </a>
          ) : (
            <a href={"/api/auth/logout"}>
              <Button>Logout</Button>
            </a>
          )}
          
        </div>
        <div className="md:hidden flex items-center">
            <button className="mobile-menu-button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
        
      </div>
      <div className={`${isMenuOpen ? "block" : "hidden"} w-full md:hidden bg-background`}>
        <nav className="flex flex-col w-full space-y-4 pb-4 text-center">
          <a href="/" className={`${theme == "dark" ? "hover:text-gray-300" : "hover:text-gray-600"} transition-colors text-xl`}>
            Home
          </a>
          <a href="/social" className={`${theme == "dark" ? "hover:text-gray-300" : "hover:text-gray-600"} transition-colors text-xl`}>
            Social
          </a>
          <a href="/social" className={`${theme == "dark" ? "hover:text-gray-300" : "hover:text-gray-600"} transition-colors text-xl`}>
            Reviews
          </a>
          <a href="/itinerary" className={`${theme == "dark" ? "hover:text-gray-300" : "hover:text-gray-600"} transition-colors text-xl`}>
            Itinerary
          </a>
          <a href="/flight" className={`${theme == "dark" ? "hover:text-gray-300" : "hover:text-gray-600"} transition-colors text-xl`}>
            Flight Tracker
          </a>
        </nav>
      </div>

    </header>
  );
}