import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Message, TailNumber } from '@prisma/client';
import { Card } from '@/components/ui/card';

interface MessageWithUsername extends Message {
	user: {username: string};
}

export default function PlaneChatroom() {
	const router = useRouter();
	const { id } = router.query;
	const { user, isLoading } = useUser();
	const [messages, setMessages] = useState<MessageWithUsername[]>([]);
	const [tailNumber, setTailNumber] = useState<TailNumber>({
		id: -1,
		number: '',
		model: '',
		airlineId: -1,
	});

	const fetchChatroomMessages = async () => {
		try {
			const response = await fetch(`/api/planes/${id}/chatroom`, {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' },
			});
			const messages = await response.json();
			console.log(messages);
			setMessages(messages);
			return messages; // Return messages for further processing if needed
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		if (!id) return;

		fetch(`/api/planes/${id}`, {
			method: 'GET',
		}).then((res) => {
			if (res.status === 200) {
				res.json().then((data: TailNumber[]) => {
					if (data.length === 0)
						setTailNumber({ id: -2, number: '', model: '', airlineId: -1 });
					else setTailNumber(data[0]);
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
			const res = await fetch(`/api/planes/${id}/chatroom/add`, {
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

	if (!user && !isLoading) {
		router.push('/api/auth/login?returnTo=/user/callback');
	}

	if (!messages) {

	}

	return (
		<div className="">
			{tailNumber?.id === -2 ? (
				<p className="text-2xl text-center pt-5 w-full h-full">
					Plane not found
				</p>
			) : tailNumber?.id === -1 ? (
				<p className="text-2xl text-center pt-5 w-full h-full">Loading...</p>
			) : (
				<>
					<h1 className="text-center text-4xl pt-24">
						{tailNumber.number} Chatroom
					</h1>
					<div className="flex flex-col gap-5 px-24 py-4 pb-20">
						{messages && messages.length !== 0 ? (
							messages.map((message) =>
								message.userId === user?.sub ? (
									<div key={message.id} className="flex flex-col items-end ">
										<Card className="w-fit px-4 py-1 bg-blue-700">
											<p className='text-white'>{message.content}</p>
										</Card>
										<p className="text-xs text-accent-foreground">
											{new Date(message.createdAt).toLocaleTimeString()}
										</p>
									</div>
								) : (
									<div key={message.id} className="flex flex-col">
										<h3 className="text-xs text-gray-500">{message.user?.username}</h3>
										<Card className="w-fit px-4 py-1 bg-white outline-primary">
											<p className="text-black">{message.content}</p>
										</Card>
										<p className="text-xs text-accent-foreground">
											{new Date(message.createdAt).toLocaleTimeString()}
										</p>
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
		</div>
	);
}
