import "@/styles/globals.css";
import type { AppProps } from "next/app";
import {UserProvider} from "@auth0/nextjs-auth0/client";
import { ThemeProvider } from "next-themes";
import {Inter} from "next/font/google";
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
            <Component {...pageProps} />
          </UserProvider>
        </ThemeProvider>
      </div>
  );
}
