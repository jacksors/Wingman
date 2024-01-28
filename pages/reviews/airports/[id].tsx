import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Inter } from 'next/font/google';
import { Review, Airport, User } from '@prisma/client';
import { ModeToggle } from '@/components/mode-toggle';
import { Card } from '@/components/ui/card';
const inter = Inter({ subsets: ['latin'] });

export default function AirportReviews() {
	const { id } = useRouter().query;
	const [reviews, setReviews] = useState<Review[]>([]);
	const [averageRating, setAverageRating] = useState<number>(0);
	const [airport, setAirport] = useState<Airport>({
		id: -1,
		code: '',
		name: '',
		location: '',
	});
	const [users, setUsers] = useState<{ [key: string]: User }>({});
	useEffect(() => {
		if (id) {
			fetch(`/api/airports/${id}/reviews`, {
				method: 'GET',
			}).then((res) => {
				if (res.status === 200) {
					res.json().then(async (data: Review[]) => {
						setReviews(data);
						const sum = data.reduce((acc, review) => acc + review.rating, 0);
						if (data.length !== 0)
							setAverageRating(Math.round(sum / data.length));
						else setAverageRating(-1);
						console.log(data);
						const userIds = data.map((review) => review.userId);
						const uniqueUserIds = Array.from(new Set(userIds));

						const userPromises = uniqueUserIds.map((userId) =>
							fetch(`/api/users/${userId}`).then((res) => res.json())
						);
						const users = await Promise.all(userPromises);

						const usersMap = users.reduce((acc, user) => {
							acc[user.id] = user;
							return acc;
						}, {});
						console.log(usersMap);
						setUsers(usersMap);
					});
				}
			});

			fetch(`/api/airports/${id}`, {
				method: 'GET',
			}).then((res) => {
				if (res.status === 200) {
					res.json().then((data: Airport[]) => {
						if (data.length === 0)
							setAirport({ id: -2, code: '', name: '', location: '' });
						else setAirport(data[0]);
					});
				} else {
					return null;
				}
			});
		}
	}, [id]);

	return (
		<div
			className={`flex flex-col h-full ${inter.className} justify-center items-center pt-20`}
		>
			{airport?.id === -2 ? (
				<p className="text-2xl text-center pt-5 w-full h-full">
					Airport not found!
				</p>
			) : (
				<>
					{airport?.id === -1 ? (
						<p className="text-2xl text-center pt-5 w-full h-full">
							Loading...
						</p>
					) : (
						<>
							<h1 className="text-5xl text-center pt-4">
								Reviews for {airport.name} ({airport.code})
							</h1>
							{averageRating === -1 ? (
								<p className="text-2xl text-center pt-5">No reviews yet!</p>
							) : (
								<>
									{/* Average rating */}
									<div className="flex flex-row gap-2">
										<div className="flex flex-col py-3 gap-2">
											<p className="text-center">Average rating</p>
											{/* Star rating */}
											<div className="flex flex-row gap-2">
												{averageRating ? (
													<>
														{[...Array(averageRating)].map((_, i) => (
															<div key={i} className="w-6 h-6 fill-foreground">
																<svg
																	xmlns="http://www.w3.org/2000/svg"
																	viewBox="0 0 576 512"
																>
																	<path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
																</svg>
															</div>
														))}
														{[...Array(5 - averageRating)].map((_, i) => (
															<div key={i} className="w-6 h-6 fill-foreground">
																<svg
																	xmlns="http://www.w3.org/2000/svg"
																	viewBox="0 0 576 512"
																>
																	<path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z" />
																</svg>
															</div>
														))}
													</>
												) : (
													<p>No reviews</p>
												)}
											</div>
										</div>
									</div>
									<ul className="grid grid-cols-1 md:grid-cols-2 gap-7 py-7 w-3/4 ">
										{reviews.map((review) => (
											<Card
												key={review.id}
												className="flex flex-col items-center gap-2 p-4 bg-secondary hover:scale-105 transition-transform"
											>
												{/* Title */}
												<div className="flex flex-col w-full items-center justify-center">
													<h2 className="text-2xl text-center">
														{review.title}
													</h2>
													<p>{review.content}</p>
												</div>
												{/* Star rating */}
												<div className="flex flex-row gap-2">
													{[...Array(review.rating)].map((_, i) => (
														<div key={i} className="w-6 h-6 fill-foreground">
															<svg
																xmlns="http://www.w3.org/2000/svg"
																viewBox="0 0 576 512"
															>
																<path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
															</svg>
														</div>
													))}
													{[...Array(5 - review.rating)].map((_, i) => (
														<div key={i} className="w-6 h-6 fill-foreground">
															<svg
																xmlns="http://www.w3.org/2000/svg"
																viewBox="0 0 576 512"
															>
																<path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z" />
															</svg>
														</div>
													))}
												</div>
												{/* Review */}
												<div className="flex flex-row gap-2">
													<div className="flex flex-col">
														<p>{users[review.userId]?.username}</p>
													</div>
												</div>
											</Card>
										))}
									</ul>
								</>
							)}
						</>
					)}
				</>
			)}
			<ModeToggle />
		</div>
	);
}
