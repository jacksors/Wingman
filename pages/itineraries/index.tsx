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
                newItems = data.map((iten: any) => {
                    const newFlights = iten.flights.map((flight: any) => {
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

    const onDelete = (id: number) => {
        fetch(`/api/itineraries?id=${id}`, {
            method: 'DELETE',
        }).then(res => {
            console.log(res);
            if (res.status === 200) {
                setItineraries(itineraries.filter(itinerary => itinerary.id !== id));
            }
        })
    }

    if (!user) return (
        <div className='flex flex-col justify-center items-center gap-5 px-24 py-12 pt-24'>
            <p className='text-xl text-gray-700 italic'>Please log in to view your itineraries!</p>
            <Button className='fixed bottom-3'><Link href='/api/auth/login?redirectTo=/users/callback'>Log In</Link></Button>
        </div>
    )

    return (
        <div className='flex flex-col justify-center items-center gap-5 px-24 py-12 pt-24'>
            <h1 className='text-3xl'>Current Itineraries</h1>
            {itineraries.map((itinerary, index) => {
                return <ItineraryCard key={'itinerary-' + index} itinerary={itinerary} isOnItineraryIndex deleteCallback={() => onDelete(itinerary.id)}/>
            })}
            <Button className='fixed bottom-3'><Link href='/itineraries/create'>Create New Itinerary</Link></Button>
        </div>
    );
};

export default Index;