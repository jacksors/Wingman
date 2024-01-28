import {NextApiRequest, NextApiResponse} from "next";
import prisma from "@/lib/prisma";

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
    const {
        query: {userId},
        method,
    } = req;

    switch (method) {
        case 'GET':
            const itineraries = await prisma.itenerary.findMany({
                where: {
                    userId: userId as string
                },
                select: {
                    flights: {
                        select: {
                            route: {
                                select: {
                                    origin: true,
                                    destination: true,
                                }
                            },
                            departTime: true,
                            arriveTime: true,
                        }
                    },
                    id: true,
                    userId: true,
                },
            })
            res.status(200).json(itineraries)
            break
        case 'PUT':
            // Update or create data in your database
            res.status(200).json({userId, name: `User ${userId}`})
            break
        default:
            res.setHeader('Allow', ['GET', 'PUT'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}

export default handle;