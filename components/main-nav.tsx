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
            <svg className={`w-14 h-14 pr-4 ${theme == "dark" ? "fill-white text-white" : "fill-black text-black"}`}
             id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 720"><path d="M575.36,378.79a201.85,201.85,0,0,0-11.12-58.12c-2-5.73-1-9.14,3.6-12.52,4.8-3.55,9.13-7.73,13.79-11.48,5.34-4.3,6.32-4,8.85,2.36,6.64,16.53,10,33.86,11.83,51.52,4.86,46.81-3.33,91.45-25.26,132.6C546.75,540,500.86,576.56,436.74,585.2c-26.28,3.53-53,4.06-79.49,5.5-43.9,2.39-87.57,6.69-131,14-25,4.23-49.92,8.29-73.3,18.61-32.7,14.43-53.83,39.35-63.3,74.45a43.22,43.22,0,0,1-2.3,5.52c-1-1.94-2.27-3.79-2.78-5.84-7.26-29.38-2.78-56.35,15.92-80.46,19.94-25.69,47.17-38,77.67-44.35a956.82,956.82,0,0,1,190.41-20.49,271.76,271.76,0,0,0,29-1.51c2.77-.31,6.57-3.14,7.56-5.75,3.21-8.46,9.25-12.68,17.33-14.91,34.76-9.61,63.36-29.42,87.95-55.69,3.15-3.37,6.32-4.51,10.53-3.47,4.91,1.22,10.07,1.84,14.66,3.82,5.22,2.26,8.22.5,11.16-3.62a140.49,140.49,0,0,0,22.88-53.19C572.33,405,573.5,391.83,575.36,378.79Z" transform="translate(0)"/><path d="M17.18,65.48A125.36,125.36,0,0,1,28.36,5.37,39.64,39.64,0,0,1,31.92,0a34.48,34.48,0,0,1,2.17,5.71c9.3,47.55,27.68,91,56.62,129.6,15.34,20.47,35.15,35.74,57.09,48.06q58.33,32.77,117.08,64.78c34.12,18.58,68.51,36.65,102.79,54.93,31,16.52,62,32.95,92.87,49.6a158.55,158.55,0,0,1,15.51,10.18c1.08.75,1.54,2.43,2.28,3.69-1.39,0-2.93.41-4.17,0-19.88-7.19-39.9-14-59.56-21.84C345,317.07,275,290.17,206.05,260.93A1078,1078,0,0,1,92.8,205c-45.3-25.83-68-68.51-75.5-120C16.38,78.6,17.18,72,17.18,65.48Z" transform="translate(0)"/><path d="M521.74,342.58c-1.52,1.3-2.45,2.49-3.66,3-2.19,1-5,1.06-6.78,2.47-8.84,6.94-15.5,3.09-24.26-1.9-30.88-17.58-62.72-33.39-94-50.26q-100.25-54.1-200.25-108.65c-15.5-8.45-30.93-17.12-45.88-26.52C116.16,141.43,94.57,114.65,85,78.61c-.4-1.51-.8-3-1.18-4.55-.78-3.15.42-3.76,3-2.39,1,.51,1.88,1.17,2.83,1.73q133.13,78.18,266.29,156.3c40.43,23.6,81.43,46.21,121.89,69.77,13.35,7.77,25.93,17,35.46,29.72C516.33,333.24,518.74,337.78,521.74,342.58Z" transform="translate(0)"/><path d="M46.53,633.36c-1.33-10.5-3.75-21-3.79-31.51-.08-26,10.37-47.75,28.76-65.57,21.23-20.57,47.27-30.73,75.68-34.85,55.24-8,110.55-15.47,165.82-23.22,39.59-5.55,79.21-10.95,118.74-16.88,23.2-3.48,43.36-14.29,61.5-29.09,3.66-3,6.06-3.62,9.95-.05a31.34,31.34,0,0,0,12.5,6.95c5.77,1.56,5.56,3.78,2.56,7.74-13.18,17.41-29.93,30.14-49.33,39.46-21.13,10.15-43.75,14.82-66.62,18.15-45.65,6.65-91.43,12.48-137.08,19.21-41.94,6.18-84.16,11.23-125.55,20.21-45.47,9.85-77,37.75-89,85.33a24,24,0,0,1-1.87,4Z" transform="translate(0)"/><path d="M661,126.85a31.82,31.82,0,0,1-10.24,22.62c-17,16.27-34.08,32.43-51.11,48.66-16.86,16.08-33.83,32-50.37,48.46-2.68,2.67-4,7.31-4.82,11.28-3.35,17.13-6.24,34.35-9.31,51.53-.24,1.32-.24,3.06-1.06,3.81-1.87,1.74-4.1,3.88-6.36,4.1-1.19.11-3.69-3.32-4-5.37-1.71-13.54-2.9-27.15-4.44-40.72-.27-2.33-1.37-4.56-2.09-6.85-2,1.12-4.39,1.87-6,3.43-3.24,3.15-5.58,3.09-8.73-.36-3.41-3.72-2.08-6.08.85-8.95s5.53-6.11,8.28-9.19c-4.1-1.24-8.13-2.8-12.3-3.68-20.44-4.3-40.94-8.33-61.35-12.76-2.46-.53-4.52-2.92-6.77-4.45,2.36-1.9,4.55-5.14,7.11-5.47,20-2.63,40.12-5.08,60.26-6.78A42.87,42.87,0,0,0,527,203.07c27.23-27.08,55.27-53.3,82.9-80,8.54-8.24,18.08-14.21,30-15.65C652.5,105.94,660.85,113.35,661,126.85Z" transform="translate(0)"/><path d="M316.59,336.77c-7.07-1.52-12.89-2.66-18.67-4-47.92-11.26-96-21.85-143.67-34.14A431.84,431.84,0,0,1,86.32,275.4c-36.06-16.09-58.82-45.1-69.46-83.79-.54-2-.15-4.2-.19-6.3a42.52,42.52,0,0,1,5,2.85c25.8,19.82,54.74,33.92,83.85,47.69,24.11,11.4,48.08,23.14,72.53,33.74,22.42,9.72,45.42,18.05,68.12,27.1q32.83,13.1,65.58,26.42c2.43,1,5.06,2.06,6.85,3.87,1.48,1.5,2.85,4.38,2.43,6.2S317.73,335.91,316.59,336.77Z" transform="translate(0)"/><path d="M471.66,389.22c-25.18-3.49-49.5-7.36-73.94-10.14-37.3-4.24-74.68-7.91-112-11.49-39.55-3.79-79.23-6.4-118.69-11-30.66-3.6-55.52-18.86-73.51-44.91a27.84,27.84,0,0,1-2.83-4.53c-.91-2.11-1.46-4.39-2.17-6.6,2.07.4,4.15.71,6.19,1.22,29.81,7.54,59.44,15.87,89.44,22.47,43.78,9.63,87.83,18,131.76,26.9,3.88.78,7.79,1.42,11.72,1.87,6.65.77,12.93-.56,17.55-5.71,3.72-4.13,7.5-4.42,12.37-2.78,20.24,6.81,40.68,13,60.79,20.16,17.83,6.36,35.31,13.69,52.92,20.67a20,20,0,0,1,3.68,2.51Z" transform="translate(0)"/><path d="M409.34,677.09c-.86-.78-3.17-1.94-4-3.78-3.88-9-7.33-18.22-11-27.34-1.53-3.82-.54-5.62,3.61-6.47,12.49-2.55,25-5.16,37.31-8.32,44.9-11.51,84.94-32.56,119.65-63.94,6.4-5.78,5.66-5.25,9.78,2.26,3.76,6.87,9.06,13.08,14.55,18.7s6.08,5.31.24,10.27c-31.68,26.93-66.42,48.72-105.61,62.06-19.9,6.77-40.68,10.85-61.06,16.13C412.22,676.82,411.54,676.83,409.34,677.09Z" transform="translate(0)"/><path d="M410.91,83.2c10.42,2.77,19.62,5,28.67,7.68,34.29,10.24,66,25.89,94.44,48,7.59,5.9,7.59,6.51.42,12.88-5.47,4.86-11.19,9.42-16.65,14.28-3,2.66-5.48,2.65-8.75.29-32.73-23.67-69.52-37-108.8-43.83-7.5-1.31-7.84-1.88-4.84-9,3.57-8.44,7.16-16.86,11-25.16C407.38,86.37,409.45,84.86,410.91,83.2Z" transform="translate(0)"/><path d="M671.15,415.69c-3.63,35.83-14.14,68.37-28.71,99.74-5.59,12-5.62,12-16.5,5.1-6-3.79-11.89-7.63-17.93-11.29-3.11-1.88-3.43-3.88-1.76-7.15C622.94,469.32,632,434.29,636,397.71c.3-2.76,3.42-6,6.05-7.4,1.71-.91,5.41.46,7.35,2a157.26,157.26,0,0,1,15.92,14.05C667.84,408.87,669.25,412.53,671.15,415.69Z" transform="translate(0)"/><path d="M244.84,409.06c-10.17-1.39-24-2.32-37.42-5.35-15.09-3.41-27.79-12.07-38.55-23.43-1.29-1.36-2-3.3-3-5a26.62,26.62,0,0,1,5.35-.66c31.1,2.22,62.23,4.27,93.31,6.89C305.72,385,346.84,388.9,388,392.82c2.86.27,5.55,2.31,8.32,3.52-3,1.21-5.88,3.28-8.92,3.48C341.1,403,294.83,405.86,244.84,409.06Z" transform="translate(0)"/><path d="M303,443.24c-17.52.25-34.18-2.85-49.19-12.58-1.71-1.11-3-3-4.43-4.48,2-.57,3.93-1.51,5.94-1.67Q314.16,420,373,415.67q16.11-1.19,32.25-1.89c9.07-.38,17.44-1.86,23.3-10.11,1-1.44,3.78-2.36,5.67-2.24,12.06.72,24.09,2,36.15,2.71,6.15.38,7.24,5.8,9.86,9.65.14.21-2.46,3.27-4.11,3.69-14.24,3.67-28.39,8.2-42.87,10.27-37.85,5.4-75.85,9.74-113.8,14.4C314,442.81,308.5,442.89,303,443.24Z" transform="translate(0)"/><path d="M202.59,430.79a35.62,35.62,0,0,1,5.64,2.07q15.5,8.2,30.83,16.7a33.38,33.38,0,0,1,4.46,3.49c-1.75.64-3.45,1.61-5.26,1.88-36,5.43-72.13,10.55-108.14,16.23-17.44,2.75-34.42,7.36-49,18.35a9,9,0,0,1-2.82.87,17.09,17.09,0,0,1,.79-3.71c9.67-20.88,25-36.43,46.52-42.91,18.37-5.53,37.79-7.47,56.78-10.76C188.66,431.91,195.05,431.59,202.59,430.79Z" transform="translate(0)"/><path d="M357.65,156c35.15,1.4,68.42,9.43,99.93,25,1.6.79,2.81,2.42,4.2,3.66a31.2,31.2,0,0,1-4.6,2.12c-13.72,3.88-27.45,7.76-41.24,11.39a15.44,15.44,0,0,1-7.61,0c-17.23-4.65-34.57-8.39-52.54-8.2a11.64,11.64,0,0,1-5.65-1.38q-18.08-10.37-36-21.09c-1.35-.81-2.23-2.44-3.33-3.69,1.47-.79,2.88-2.09,4.44-2.3C329.4,159.55,343.53,157.8,357.65,156Z" transform="translate(0)"/><path d="M314.49,83.58c1.13,1,3.89,2.25,4.81,4.36,4,9,7.4,18.19,11,27.34,1.39,3.56.86,5.32-3.62,6.29-19.49,4.22-38.85,9.09-58.29,13.55a9.26,9.26,0,0,1-6.12-.59c-9.78-5.55-19.36-11.47-29.06-17.16-3.13-1.84-3.93-3.53-.3-5.6C257.84,97.49,284.49,88.25,314.49,83.58Z" transform="translate(0)"/><path d="M312.67,678.71c-18.56-5.33-37-10.18-55.12-16-9.14-3-17.78-7.59-26.56-11.65-1.43-.66-2.42-2.31-3.62-3.51,1.41-.94,2.7-2.36,4.24-2.74q26.83-6.63,53.74-12.92a11.73,11.73,0,0,1,5.2.16c12.17,2.85,24.28,6,36.5,8.63,4,.86,4.66,2.64,3.31,6-3.66,9.09-7.21,18.25-11.25,27.17C318.25,675.69,315.46,676.67,312.67,678.71Z" transform="translate(0)"/><path d="M670.1,320.13c-.66,1.15-1.48,3.78-3.22,5.41-6.47,6-13.11,11.89-19.92,17.51-5.09,4.2-11.22,1.43-12.53-5-3.74-18.33-7.83-36.6-11.42-55-.48-2.48.27-6.61,2-7.89,7.91-6,16.37-11.2,24.59-16.75,2.38-1.61,4.33-2.16,5.63,1.25A243.63,243.63,0,0,1,670.1,320.13Z" transform="translate(0)"/><path d="M527.59,417.67c-13.33.12-24.92-11.44-25.08-25s11.45-25.37,24.72-25.35,24.78,12,24.73,25.52S540.88,417.56,527.59,417.67Z" transform="translate(0)"/><path d="M50.33,413c1.65-2.81,2.63-6,4.73-7.79C61.25,399.84,67.8,394.9,74.38,390c3.85-2.83,9.91.36,10.65,5.67,1.49,10.63,3,21.28,3.79,32,.2,2.77-1.57,6.38-3.57,8.48-6.55,6.89-13.77,13.11-20.42,19.89-3.2,3.26-5.39,4.15-6.46-1.19C55.61,441.08,53.05,427.25,50.33,413Z" transform="translate(0)"/><path d="M23.13,342.4c11.86,0,23,11.06,23.06,22.92.06,12.93-10.43,23.71-22.86,23.5C11.05,388.6,0,377.41,0,365.23,0,353.36,11.12,342.4,23.13,342.4Z" transform="translate(0)"/><path d="M697.3,342.4c12.08-.12,22.51,10.14,22.7,22.32.21,13.4-10.13,24.28-23,24.25-11.56,0-22.49-10.93-22.77-22.71C673.9,354.1,685.11,342.52,697.3,342.4Z" transform="translate(0)"/><path d="M338.92,66.92c0-12.59,10.2-23.28,22.4-23.41s23,10.47,23.21,22.73c.19,12.41-11,23.8-23.2,23.58C349.53,89.61,338.94,78.78,338.92,66.92Z" transform="translate(0)"/><path d="M338.9,697.81c-.08-13.13,10.54-24.47,23-24.48,12.06,0,22.33,11.14,22.37,24.28,0,12-10.12,22.12-22.6,22.39C349.72,720.25,339,709.77,338.9,697.81Z" transform="translate(0)"/><path d="M624.73,203.31a8.76,8.76,0,0,1,1.87,1.22,11.84,11.84,0,0,1,1.46,2.22c9.9,16.6,10,16.68-5.61,28-8,5.86-16.27,11.44-24.5,17-1.18.8-2.81,1-4.23,1.4-.21-1.64-.51-3.28-.6-4.93,0-.87.46-1.77.41-2.64-1.41-21.89,15.86-30.06,29.08-41.19A13.13,13.13,0,0,1,624.73,203.31Z" transform="translate(0)"/><path d="M602.81,568.77c-9.28,0-16.22-6.78-16.07-15.68A15.92,15.92,0,0,1,603,537.42c8.74.07,15.31,6.83,15.25,15.71A15.36,15.36,0,0,1,602.81,568.77Z" transform="translate(0)"/><path d="M52.44,317.05c.7-3.48,1.43-7.42,2.33-11.31A11.55,11.55,0,0,1,56.3,303c.7.79,1.74,1.46,2,2.37a96.87,96.87,0,0,0,20.24,34.82c.67.76.53,2.27.76,3.44-1.2.19-3,1-3.53.49q-11.7-11.11-23-22.65C52.1,320.73,52.55,318.87,52.44,317.05Z" transform="translate(0)"/></svg>
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
            <a href="/itinerary" className={`${theme == "dark" ? "hover:text-gray-300" : "hover:text-gray-600"} transition-colors`}>
              Itinerary
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