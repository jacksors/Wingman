import {Airport, Flight, Itenerary} from "@prisma/client";

export interface ItineraryWithAverages extends Itenerary {
    flights: FlightWithRouteAndReviewInfo[]
}

export interface FlightWithRouteAndReviewInfo extends Flight {
    route: {
        origin: Airport,
        destination: Airport,
        originReviewAverage: number,
        destinationReviewAverage: number,
    },
    aircraftReviewAverage: number,
}
