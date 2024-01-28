import {NextApiRequest, NextApiResponse} from "next";

const handle = async (req: NextApiRequest, res: NextApiResponse) => {

    const tailNumber = await prisma.tailNumber.findMany();

    return res.status(200).json(tailNumber);
}

export default handle;