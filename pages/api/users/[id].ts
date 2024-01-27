import prisma from "@/lib/prisma";
import {NextApiRequest, NextApiResponse} from "next";

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        const { id } = req.query;

        const user = await prisma.user.findUnique({
            where: {
                id: id as string
            }
        })

        return res.status(200).json(user);
    } else if (req.method === 'PUT') {
        const { id } = req.query;

        const user = await prisma.user.update({
            where: {
                id: id as string
            },
            data: {
                ...req.body
            }
        })

        return res.status(200).json(user);
    }
}

export default handle;