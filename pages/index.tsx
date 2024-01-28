import Image from 'next/image';
import { Inter } from 'next/font/google';
import { Button } from '@/components/ui/button';
import { useUser } from '@auth0/nextjs-auth0/client';
import MainNav from '@/components/main-nav';
import { ModeToggle } from '@/components/mode-toggle';
import { Card } from '@/components/ui/card';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { User } from '@prisma/client';
import { use } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
	const { user, error, isLoading } = useUser();
	const [wingmanUser, setWingmanUser] = useState<User>();
	const { theme } = useTheme();

	useEffect(() => {
		fetch(`/api/users/${user?.sub}`, {
			method: 'GET',
		}).then((res) => {
			if (res.status === 200) {
				res.json().then((data: User) => {
					setWingmanUser(data);
				});
			} else {
				return null;
			}
		})}, [isLoading]);

	return (
		<>
			<main
				className={`flex min-h-screen flex-col items-center justify-start pt-24 ${inter.className}`}
			>
				<div className="relative flex flex-col w-full h-fit p-11 gap-2 items-center bg-secondary">
					<img
						src="/Logo.png"
						alt="Wingman Logo"
						className={`w-36 h-36 bg-black ${
							theme === 'dark' ? 'bg-opacity-0' : 'bg-opacity-10'
						} p-3 rounded-full `}
					/>
					{user ? (
						<p className="text-4xl text-center">
							Welcome to Wingman{wingmanUser ? (", " + wingmanUser?.firstName) : ""}!
						</p>
					) : (
						<p className="text-4xl">Welcome to Wingman!</p>
					)}
					<p className="text-xl">Journey Smarter: Plan, Connect, Fly!</p>
				</div>
				{user ? (
					<div className="flex flex-col w-full h-fit pb-11 gap-3 items-center">
						<h1 className="text-4xl pt-5">Get Started:</h1>
						<div className="flex flex-col md:flex-row w-full h-fit justify-center items-center pt-2 gap-3 px-12 md:px-0">
							<a href="/social">
								<Card className="flex flex-col w-full md:w-36 h-36 p-2 gap-3 justify-center items-center bg-secondary hover:scale-105 transition-transform">
									<div className="w-9 h-9 fill-foreground">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
											<path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
										</svg>
									</div>
									<p className="text-xl">Social</p>
								</Card>
							</a>
							{/*Reviews*/}
							<a href="/reviews">
								<Card className="flex flex-col w-full md:w-36 h-36 p-2 gap-3 justify-center items-center bg-secondary hover:scale-105 transition-transform">
									<div className="w-9 h-9 fill-foreground">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
											<path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
										</svg>
									</div>
									<p className="text-xl">Reviews</p>
								</Card>
							</a>
							{/*Itinerary*/}
							<a href="/itinerary">
								<Card className="flex flex-col w-full md:w-36 h-36 p-2 gap-3 justify-center items-center bg-secondary hover:scale-105 transition-transform">
									<div className="w-9 h-9 fill-foreground">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
											<path d="M40 48C26.7 48 16 58.7 16 72v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V72c0-13.3-10.7-24-24-24H40zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM16 232v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V232c0-13.3-10.7-24-24-24H40c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V392c0-13.3-10.7-24-24-24H40z" />
										</svg>
									</div>
									<p className="text-xl">Itinerary</p>
								</Card>
							</a>
						</div>
					</div>
				) : (
					<div className="flex flex-col w-full h-fit pb-11 pt-10 gap-3 items-center">
						<h1 className="text-4xl pb-2">Login or Sign Up to Get Started:</h1>
						<div className="flex flex-col md:flex-row w-full h-fit justify-center items-center pt-2 gap-3 px-12 md:px-0">
							<Button className="w-full md:w-36">
								<a href="/api/auth/login?returnTo=/user/callback">
									Login or Sign Up
								</a>
							</Button>
						</div>
					</div>
				)}

				<ModeToggle />
			</main>
		</>
	);
}
