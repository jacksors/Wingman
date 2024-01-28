import {NextApiRequest, NextApiResponse} from "next";
import prisma from "@/lib/prisma";

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
    const {method} = req;

    const getDayBounds = (date: Date) => {
        // Create a new Date object for the start of the day
        let startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0); // Set time to 00:00:00.000

        // Create a new Date object for the end of the day
        let endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999); // Set time to 23:59:59.999

        return { startOfDay, endOfDay };
    }

    switch (method) {
        case 'POST': {
            const data = req.body as {
                userId: string,
                routes: {
                    originCode: string,
                    destinationCode: string,
                    flightNo: string,
                    date: Date
                }[]
            };

            console.log(data);

            const flights: {id: number, flightNumber: string, airlineId: number, tailNumberId: number, routeId: number, departTime: Date, arriveTime: Date}[] = [];

            for (const route of data.routes) {
                console.log(route)
                const flight = await prisma.flight.findFirst({
                    where: {
                        flightNumber: route.flightNo,
                    }
                })
                console.log(flight);
                if (flight) {
                    console.log(flight);
                    flights.push(flight);
                }
            }

            if (flights.length <= 0) {
                return res.status(400).json({message: 'No flights found'});
            }
            const create = await prisma.itenerary.create({
                data: {
                    user: {
                        connect: {
                            id: data.userId
                        }
                    },
                    flights: {
                        connect: flights.map(flight => {
                            return {
                                id: flight.id
                            }
                        })
                    }
                }
            });

            res.status(200).json(create);
            break;
        }
        case 'DELETE': {
            const {id} = req.query;
            if (!id) return res.status(400).json({message: 'Itinerary ID is required'});
            if (typeof id !== 'string') return res.status(400).json({message: 'Itinerary ID must be a string'});
            const itineraryId = parseInt(id);
            const itinerary = await prisma.itenerary.findFirst({
                where: {
                    id: itineraryId
                }
            });
            if (!itinerary) return res.status(400).json({message: 'Itinerary not found'});
            const deleteItinerary = await prisma.itenerary.delete({
                where: {
                    id: itineraryId
                }
            });
            res.status(200).json(deleteItinerary);
            break;
        }
    }
}

export default handle;