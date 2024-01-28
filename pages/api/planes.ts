import {NextApiRequest, NextApiResponse} from "next";
import prisma from "@/lib/prisma";

const handle = async (req: NextApiRequest, res: NextApiResponse) => {

    const tailNumber = await prisma.tailNumber.findMany();

    return res.status(200).json(tailNumber);
}

export default handle;