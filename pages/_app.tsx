import "@/styles/globals.css";
import type { AppProps } from "next/app";
import {UserProvider} from "@auth0/nextjs-auth0/client";
import { ThemeProvider } from "next-themes";
import {Inter} from "next/font/google";
import { Main } from "next/document";
import MainNav from "@/components/main-nav";
const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
      <div className={inter.className}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          <UserProvider>
            <MainNav />
            <Component {...pageProps} />
          </UserProvider>
        </ThemeProvider>
      </div>
  );
}
