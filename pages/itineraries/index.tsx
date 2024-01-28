import React, {useEffect, useState} from 'react';
import {useUser} from "@auth0/nextjs-auth0/client";
import {User} from "@prisma/client";
import {ItineraryCard, Props} from "@/components/itinerary/itinerarycard";
import {Button} from "@/components/ui/button";
import Link from "next/link";

const Index = () => {
    const { user, isLoading } = useUser();
    const [wingmanUser, setWingmanUser] = useState<User | null>(null);
    const [itineraries, setItineraries] = useState<Props["itinerary"][]>([]);

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
            fetch(`/api/users/${wingmanUser.id}/itineraries`).then(res => res.json()).then(data => {
                let newItems;
                console.log(data);
                newItems = data.map(iten => {
                    const newFlights = iten.flights.map(flight => {
                        flight.departTime = new Date(flight.departTime);
                        flight.arriveTime = new Date(flight.arriveTime);
                        return flight;
                    })
                    iten.flights = newFlights;
                    return iten;
                })
                console.log(newItems);
                setItineraries(data);
            })
        }
    }, [wingmanUser])


    return (
        <div className='flex flex-col justify-center items-center'>
            <h1>Current itineraries</h1>
            {itineraries.map((itinerary, index) => {
                return <ItineraryCard key={'itinerary-' + index} itinerary={itinerary} />
            })}
            <Button><Link href='/itineraries/create'>Create new</Link></Button>
        </div>
    );
};

export default Index;