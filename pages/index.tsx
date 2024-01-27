import Image from "next/image";
import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button"
import {useUser} from "@auth0/nextjs-auth0/client";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { user, error, isLoading } = useUser();
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 bg- ${inter.className}`}
    >
      <p>{user?.email}</p>
      {!user ? <a href={"/api/auth/login"}><Button>Login</Button></a> : <a href={"/api/auth/logout"}><Button>Logout</Button></a>}
    </main>
  );
}
