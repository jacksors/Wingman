import React from 'react';
import {Card} from "@/components/ui/card";

export interface Props {
    itinerary: {
        id: number,
        userId: string,
        flights: {
            departTime: Date,
            arriveTime: Date,
            route: {
                origin: {
                    id: number,
                    code: string,
                    name: string,
                    location: string
                },
                destination: {
                    id: number,
                    code: string,
                    name: string,
                    location: string
                }
            }
        }[]
    };
}

type Itinerary = {
    flights: {
        departTime: Date;
        arriveTime: Date;
        route: {
            origin: { code: string };
            destination: { code: string };
        };
    }[];
};

function findInitialOriginAndFinalDestination(itinerary: Itinerary): { initialOrigin: string | null, finalDestination: string | null } {
    const origins = new Set<string>();
    const destinations = new Set<string>();

    for (const flight of itinerary.flights) {
        origins.add(flight.route.origin.code);
        destinations.add(flight.route.destination.code);
    }

    let initialOrigin: string | null = null;
    let finalDestination: string | null = null;

    origins.forEach(code => {
        if (!destinations.has(code)) {
            initialOrigin = code;
        }
    });

    destinations.forEach(code => {
        if (!origins.has(code)) {
            finalDestination = code;
        }
    });

    return {initialOrigin, finalDestination};
}

function findEarliestLatestTimes(itinerary: Itinerary): { departTime: Date, arriveTime: Date } {
    const departTimes = new Set<Date>();
    const arriveTimes = new Set<Date>();

    for (const flight of itinerary.flights) {
        departTimes.add(flight.departTime);
        arriveTimes.add(flight.arriveTime);
    }

    let earliestDepartTime: Date | null = null;
    let latestArriveTime: Date | null = null;

    departTimes.forEach(time => {
        if (!earliestDepartTime || time < earliestDepartTime) {
            earliestDepartTime = time;
        }
    });

    arriveTimes.forEach(time => {
        if (!latestArriveTime || time > latestArriveTime) {
            latestArriveTime = time;
        }
    });

    return {departTime: earliestDepartTime!, arriveTime: latestArriveTime!};
}

export const ItineraryCard = (props: Props) => {
    const { initialOrigin, finalDestination } = findInitialOriginAndFinalDestination(props.itinerary);
    const { departTime, arriveTime } = findEarliestLatestTimes(props.itinerary);

    return (
        <Card className="flex flex-col m-8">
            <div className="flex flex-row">
                <span className="material-symbols-outlined">
                    flight_takeoff
                </span>
                <p>{initialOrigin} - {departTime?.toDateString()}</p>
            </div>
            <div className="flex flex-row">
                <span className="material-symbols-outlined">
                    flight_land
                </span>
                <p>{finalDestination} - {arriveTime?.toDateString()}</p>
            </div>
        </Card>
    );
};