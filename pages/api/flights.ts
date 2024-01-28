import {NextApiRequest, NextApiResponse} from "next";
import prisma from "@/lib/prisma";

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
    const {date, from, to} = req.query;

    if (from && to) {
       const flights = await prisma.flight.findMany({
           where: {
               route: {
                   origin: {
                       code: from as string
                   },
                   AND: {
                       destination: {
                           code: to as string
                       }
                   }
               },
           },
           select: {
               route: {
                   include: {
                       origin: true,
                       destination: true
                   }
               },
               id: true,
               flightNumber: true,
           }
       });

         return res.status(200).json(flights);
    }
    res.status(400).json({message: 'Missing query parameters'});
};

export default handle;