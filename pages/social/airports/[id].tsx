import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Message, Airport } from '@prisma/client';
import { Card } from '@/components/ui/card';
import { ModeToggle } from '@/components/mode-toggle';

interface MessageWithUsername extends Message {
	username: string;
}

export default function AirportChatroom() {
	const router = useRouter();
	const { id } = router.query;
	const { user, isLoading } = useUser();
	const [messages, setMessages] = useState<MessageWithUsername[]>([]);
	const [airport, setAirport] = useState<Airport>({
		id: -1,
		code: '',
		name: '',
		location: '',
	});

	const fetchChatroomMessages = async () => {
		try {
			const response = await fetch(`/api/airports/${id}/chatroom`, {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' },
			});
			const messages = await response.json();
			setMessages(messages);
			return messages; // Return messages for further processing if needed
		} catch (err) {
			console.error(err);
		}
	};

	const fetchChatroomUsers = async (id: string) => {
		try {
			const response = await fetch(`/api/users/${id}`, {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' },
			});
			const users = await response.json();
			return user;
		} catch (err) {
			console.error(err);
		}
	}

	useEffect(() => {
		if (!id) return;

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

		fetchChatroomMessages();

		// Poll for new messages every 5 seconds
		const interval = setInterval(() => {
			fetchChatroomMessages();
		}, 3000);

		// Cleanup interval on component unmount
		return () => clearInterval(interval);
	}, [id]);

	const sendMessage = async (e : any) => {
		e.preventDefault();
		console.log(user);
		const content = e.target.message.value;
		if (!user || !user.sub) {
			console.error('User ID is required');
			return;
		}

		try {
			const res = await fetch(`/api/airports/${id}/chatroom/add`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ content, userId: user.sub }),
			});
			if (!res.ok) {
				throw new Error(`HTTP error! Status: ${res.status}`);
			}

			fetchChatroomMessages();
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className="">
			{airport?.id === -2 ? (
				<p className="text-2xl text-center pt-5 w-full h-full">
					Airport not found
				</p>
			) : airport?.id === -1 ? (
				<p className="text-2xl text-center pt-5 w-full h-full">Loading...</p>
			) : (
				<>
					<h1 className="text-center text-4xl pt-8">{airport.name} Chatroom</h1>
					<div className="flex flex-col gap-5 px-24 py-4 pb-20">
						{messages && messages.length !== 0 ? (
							messages.map((message) =>
								message.userId === user?.sub ? (
									<div key={message.id} className="flex flex-col items-end ">
										<p className="text-xs text-accent-foreground">
											{new Date(message.createdAt).toLocaleTimeString()}
										</p>
										<Card className="w-fit px-4 py-1 bg-blue-700">
											<p className='text-white'>{message.content}</p>
										</Card>
									</div>
								) : (
									<div key={message.id} className="flex flex-col">
										<h3 className="text-xs text-gray-500">{message.username}</h3>
										<p className="text-xs text-accent-foreground">
											{new Date(message.createdAt).toLocaleTimeString()}
										</p>
										<Card className="w-fit px-4 py-1 bg-white outline-primary">
											<p className="text-black">{message.content}</p>
										</Card>
									</div>
								)
							)
						) : (
							<p className="text-center pt-5">There are no messages yet!</p>
						)}
					</div>
					<form
						onSubmit={sendMessage}
						className="flex flex-row gap-3 fixed bottom-5 w-full justify-center items-center"
					>
						<input
							type="text"
							name="message"
							required
							className="outline-primary p-2 px-3 bg-foreground text-background rounded"
						/>
						<button
							type="submit"
							onSubmit={sendMessage}
							className="p-2 px-3 bg-foreground outline-primary text-background rounded"
						>
							Send
						</button>
					</form>
				</>
			)}
			<ModeToggle />
		</div>
	);
}
