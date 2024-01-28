import prisma from "@/lib/prisma";
import { ReviewType } from "@prisma/client";
import {NextApiRequest, NextApiResponse} from "next";

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        const { id } = req.query;
        if (!id) return res.status(400).json({ message: 'Tail number ID is required' });
        if (typeof id !== 'string') return res.status(400).json({ message: 'Tail number must be a string' });
        const reviews = await prisma.review.findMany({
          where: {
            tailNumber: {
              id: parseInt(id) as number
            },
            AND: {
              reviewType: ReviewType.TAIL_NUMBER
            }
          },
          include: {
            tailNumber: true
          }
        })

        return res.status(200).json(reviews);
    } else return res.status(405).json({ message: 'Method not allowed' });
}

export default handle;