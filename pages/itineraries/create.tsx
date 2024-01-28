import React, {useEffect, useState} from 'react';
import {Card} from "@/components/ui/card";
import {Airport, Flight, Route, User} from "@prisma/client";
import {useUser} from "@auth0/nextjs-auth0/client";
import {FlightAdd} from "@/components/itinerary/flightadd";

const Create = () => {
    const [originAirport, setOriginAirport] = React.useState<Airport | null>(null);
    const [destinationAirport, setDestinationAirport] = React.useState<Airport | null>(null);

    const [routes, setRoutes] = useState<Route[]>([]);
    const [flights, setFlights] = useState<Flight[]>([]);

    const [airports, setAirports] = React.useState<Airport[]>([]);

    const { user, isLoading } = useUser();
    const [wingmanUser, setWingmanUser] = useState<User | null>(null);

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

    return (
        <div>
            <Card className={'flex flex-col justify-center items-center'}>
                <FlightAdd airports={airports} setOriginAirportCallback={setOriginAirport} setDestinationAirportCallback={setDestinationAirport} />
            </Card>
        </div>
    );
};

export default Create;