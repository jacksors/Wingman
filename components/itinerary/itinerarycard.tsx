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
        <Card className="flex flex-col md:flex-row gap-10 h-fit md:h-36 py-12 w-full justify-around items-center bg-secondary hover:scale-105 transition-transform cursor-pointer">
            <div className="flex flex-col items-center">
                <div className='fill-foreground w-16'>
                    <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24"  viewBox="0 0 24 24"><g><rect fill="none" height="24" width="24"/></g><g><g><g><path d="M2.5,19h19v2h-19V19z M22.07,9.64c-0.21-0.8-1.04-1.28-1.84-1.06L14.92,10l-6.9-6.43L6.09,4.08l4.14,7.17l-4.97,1.33 l-1.97-1.54l-1.45,0.39l2.59,4.49c0,0,7.12-1.9,16.57-4.43C21.81,11.26,22.28,10.44,22.07,9.64z"/></g></g></g></svg>
                </div>
                <p className='text-3xl'>{initialOrigin}</p>
                <p>{departTime?.toDateString()}</p>
            </div>
            <div className="flex flex-col items-center">
                <div className='fill-foreground w-16'>
                    <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24"><g><rect fill="none" height="24" width="24"/></g><g><g><g><path d="M2.5,19h19v2h-19V19z M19.34,15.85c0.8,0.21,1.62-0.26,1.84-1.06c0.21-0.8-0.26-1.62-1.06-1.84l-5.31-1.42l-2.76-9.02 L10.12,2v8.28L5.15,8.95L4.22,6.63L2.77,6.24v5.17L19.34,15.85z"/></g></g></g></svg>
                </div>
                <p className='text-3xl'>{finalDestination}</p>
                <p>{arriveTime?.toDateString()}</p>
            </div>
        </Card>
    );
};