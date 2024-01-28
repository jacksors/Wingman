import {NextApiRequest, NextApiResponse} from "next";
import prisma from "@/lib/prisma";

const handle = async (req: NextApiRequest, res: NextApiResponse) => {

    const airport = await prisma.airport.findMany();

    return res.status(200).json(airport);
}

export default handle;