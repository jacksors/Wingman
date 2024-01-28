import { Html, Head, Main, NextScript } from "next/document";
import { cn } from "@/lib/utils";


export default function Document() {
  return (
      <Html lang="en" suppressHydrationWarning>
          <Head/>
          <link rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"/>
          <body>
          <Main/>
          <NextScript/>
          </body>
      </Html>
  );
}
