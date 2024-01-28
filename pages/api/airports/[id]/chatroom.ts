import prisma from "@/lib/prisma";
import {NextApiRequest, NextApiResponse} from "next";

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        const { id } = req.query;
        if (!id) return res.status(400).json({ message: 'Chatroom ID is required' });
        if (typeof id !== 'string') return res.status(400).json({ message: 'Chatroom ID must be a string' });
        const messages = await prisma.message.findMany({
            where: {
                chatroomId: parseInt(id) as number,
            }, include: {
                user: {
                    select: {
                        username: true,
                    }
                }
            }
        })
        return res.status(200).json(messages);
    } else return res.status(405).json({ message: 'Method not allowed' });
}

export default handle;