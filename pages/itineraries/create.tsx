import React, {useEffect, useState} from 'react';
import {Card} from "@/components/ui/card";
import {Airport, Flight, Route, User} from "@prisma/client";
import {useUser} from "@auth0/nextjs-auth0/client";
import {FlightAdd} from "@/components/itinerary/flightadd";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/router";

const Create = () => {
    const [routes, setRoutes] = useState<{ originCode: string, destinationCode: string }[]>([]);

    const [flightNoAndDates, setFlightNoAndDates] = useState<{ flightNo: string, date: Date, originCode: string, destinationCode: string }[]>([]);

    const [airports, setAirports] = React.useState<Airport[]>([]);

    const { user, isLoading } = useUser();
    const [wingmanUser, setWingmanUser] = useState<User | null>(null);

    const router = useRouter();

    useEffect(() => {
        if (!isLoading && user) {
            fetch(`/api/users/${user?.sub}`).then(res => res.json()).then(data => {
                console.log(data);
                setWingmanUser(data);
            })
        }
    }, [isLoading])

    useEffect(() => {
        if (wingmanUser) {
            fetch(`/api/airports`).then(res => res.json()).then(data => {
                setAirports(data);
            })
        }
    }, [wingmanUser])

    const updateFlightNoAndDates = (index: number, newFlight: { flightNo: string, date: Date, originCode: string, destinationCode: string }) => {
        console.log(newFlight)
        const updatedFlightNoAndDates = flightNoAndDates.map((flight, i) => i === index ? newFlight : flight);
        setFlightNoAndDates(updatedFlightNoAndDates);
    };

    // Validate that the route that the user is trying to create is contiguous
    // Note that the flights array is not guaranteed to be in order
    const validateRoute = (flights: { originCode: string, destinationCode: string}[]) => {
        if (flights.length === 0) return true;

        const flightMap = new Map();
        const destinations = new Set();

        // Step 2: Populate the map and set of destinations
        flights.forEach(({ originCode, destinationCode }) => {
            flightMap.set(originCode, destinationCode);
            destinations.add(destinationCode);
        });

        // Step 3: Find the starting point
        let start = null;
        for (let { originCode } of flights) {
            if (!destinations.has(originCode)) {
                if (start === null) {
                    start = originCode;
                } else {
                    // More than one possible starting point means the route is not contiguous
                    return false;
                }
            }
        }

        // If there's no starting point, the route is circular and not contiguous
        if (start === null) {
            return false;
        }

        // Step 4: Follow the route
        let count = 0;
        while (flightMap.has(start) && count < flights.length) {
            start = flightMap.get(start);
            count++;
        }

        // Step 5: Check if all flights have been traversed
        return count === flights.length;
    };

    const onSubmit = () => {
        if (validateRoute(flightNoAndDates)) {
            console.log(flightNoAndDates);
            const routes = flightNoAndDates.map(flight => ({
                originCode: flight.originCode,
                destinationCode: flight.destinationCode,
                flightNo: flight.flightNo,
                date: flight.date
            }));
            console.log(routes);
            fetch(`/api/itineraries`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: wingmanUser?.id,
                    routes: routes
                })
            }).then(res => res.json()).then(data => {
                console.log(data);
            })
            router.push('/itineraries');
        } else {
            console.log('Invalid route');
            alert('There is an issue in your route! Please make sure that your route is contiguous and your return flights are in a separate itinerary.')
        }
    };

    return (
        <div>
            <Card className={'flex flex-col justify-center items-center'}>
                {routes.map((route, index) => (
                    <FlightAdd key={index} airports={airports} setFlightCallback={newFlight => updateFlightNoAndDates(index, newFlight)} />
                ))}
                <Button
                    className={'mt-4 bg-accent p-3 rounded'}
                    onClick={() => {
                        setRoutes([...routes, {originCode: '', destinationCode: ''}]);
                        setFlightNoAndDates([...flightNoAndDates, {flightNo: '', date: new Date(), originCode: '', destinationCode: ''}]);
                    }}
                    >
                    Add flight
                </Button>
                <Button
                    className={'mt-4 bg-accent p-3 rounded'}
                    onClick={onSubmit}>
                    Submit
                </Button>
            </Card>
        </div>
    );
};

export default Create;