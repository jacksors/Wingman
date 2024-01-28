import prisma from "@/lib/prisma";
import { ReviewType } from "@prisma/client";
import {NextApiRequest, NextApiResponse} from "next";

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        const { id } = req.query;
        if (!id) return res.status(400).json({ message: 'Airport ID is required' });
        if (typeof id !== 'string') return res.status(400).json({ message: 'Airport ID must be a string' });
        const reviews = await prisma.review.findMany({
            where: {
                airportId: parseInt(id) as number,
                AND: {
                    reviewType: ReviewType.AIRPORT
                }
            }
        })
        let average = 0;
        reviews.forEach(review => {
            average += review.rating;
        })
        average = average / reviews.length;
        return res.status(200).json(average);

    } else return res.status(405).json({ message: 'Method not allowed' });
}

export default handle;