import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from 'next';

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const { id } = req.query;
        if (!id) return res.status(400).json({ message: 'Chatroom ID is required' });
        if (typeof id !== 'string') return res.status(400).json({ message: 'Chatroom ID must be a string' });
        const chatroomId = parseInt(id);
        const { content, userId } = req.body;
        if (!content) return res.status(400).json({ message: 'Content is required' });
        if (!userId) return res.status(400).json({ message: 'User ID is required' });
        if (typeof content !== 'string') return res.status(400).json({ message: 'Content must be a string' });
        if (typeof userId !== 'string') return res.status(400).json({ message: 'User ID must be a string' });
        const message = await prisma.message.create({
            data: {
                content,
                userId,
                chatroomId,
            }
        })

        return res.status(200).json(message);
    } else return res.status(405).json({ message: 'Method not allowed' });
}

export default handle;