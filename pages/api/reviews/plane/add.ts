import type { NextApiRequest, NextApiResponse } from 'next'
import type {User} from '@prisma/client'
import prisma from '@/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const data: Review[] = req.body;

        console.log(data);

        const reviews = await prisma.user.createMany({
            data: data
        });

        // send response
        res.status(200).json(reviews);
    }
}
