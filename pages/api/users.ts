import type { NextApiRequest, NextApiResponse } from 'next'
import type {User} from '@prisma/client'
import prisma from '@/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const data: User[] = req.body;

        console.log(data);

        const users = await prisma.user.createMany({
            data: data
        });

        // send response
        res.status(200).json(users);
    }
}
