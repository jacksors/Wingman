import prisma from "@/lib/prisma";
import { TailNumber } from "@prisma/client";
import {NextApiRequest, NextApiResponse} from "next";

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        const { id } = req.query;
        if (!id) return res.status(400).json({ message: 'Airport ID is required' });
        if (typeof id !== 'string') return res.status(400).json({ message: 'Airport ID must be a string' });
        const tailNumber = await prisma.tailNumber.findMany({
            where: {
                id: parseInt(id) as number
            }
        })

        return res.status(200).json(tailNumber);
    } else return res.status(405).json({ message: 'Method not allowed' });
}

export default handle;