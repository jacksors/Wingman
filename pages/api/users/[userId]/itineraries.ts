import {NextApiRequest, NextApiResponse} from "next";
import prisma from "@/lib/prisma";
import {Airport, Flight, Itenerary, ReviewType} from "@prisma/client";
import {FlightWithRouteAndReviewInfo, ItineraryWithAverages} from "@/types/itineraries";

const averageReviewsAirport = async (airportId: number) => {
    const reviews = await prisma.review.findMany({
        where: {
            airportId: airportId,
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
    return average;
};

const averageReviewsAircraft = async (aircraftId: number) => {
    const reviews = await prisma.review.findMany({
        where: {
            id: aircraftId,
            AND: {
                reviewType: ReviewType.TAIL_NUMBER
            }
        }
    })
    let average = 0;
    reviews.forEach(review => {
        average += review.rating;
    })
    average = average / reviews.length;
    return average;
};

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
                include: {
                    flights: {
                        include: {
                            route: {
                                select: {
                                    origin: true,
                                    destination: true,
                                }
                            },
                        }
                    },
                },
            })
            res.status(200).json(itineraries)

            // Get average review for airports
            let itinerariesWithAverages: ItineraryWithAverages[] = [];
            for (const itinerary of itineraries) {
                let flightsWithAverages: FlightWithRouteAndReviewInfo[] = [];
                for (const flight of itinerary.flights) {
                    let originReviewAverage = await averageReviewsAirport(flight.route.origin.id);
                    let destinationReviewAverage = await averageReviewsAirport(flight.route.destination.id);
                    let aircraftReviewAverage = await averageReviewsAircraft(flight.tailNumberId);
                    flightsWithAverages.push({
                        ...flight,
                        route: {
                            ...flight.route,
                            originReviewAverage: originReviewAverage,
                            destinationReviewAverage: destinationReviewAverage,
                        },
                        aircraftReviewAverage: aircraftReviewAverage,
                    })
                }
                itinerariesWithAverages.push({
                    ...itinerary,
                    flights: flightsWithAverages,
                })
            }

            res.status(200).json(itinerariesWithAverages);
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