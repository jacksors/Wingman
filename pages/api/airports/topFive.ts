import {NextApiRequest, NextApiResponse} from "next";
import prisma from "@/lib/prisma";

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        const reviews = await prisma.review.findMany({
          where: {
            reviewType: 'AIRPORT'
          }
        });

        reviews.sort((a, b) => {
          if (a.rating > b.rating) return -1;
          else if (a.rating < b.rating) return 1;
          else return 0;
        }).slice(0, 5);

        console.log(reviews);

        const topFiveAirportsIds : number[] = reviews
          .filter(review => review.airportId !== null)
          .map(review => review.airportId!);

        const airports = await prisma.airport.findMany({
          where: {
            id: {
              in: topFiveAirportsIds
            }
          }
        });

        return res.status(200).json(airports);
    } else return res.status(405).json({ message: 'Method not allowed' });
}

export default handle;