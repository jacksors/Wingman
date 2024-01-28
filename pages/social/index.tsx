import React, {useEffect, useState} from 'react';
import {useUser} from "@auth0/nextjs-auth0/client";
import {Itenerary, User} from "@prisma/client";
import {ItineraryCard, Props} from "@/components/itinerary/itinerarycard";

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
            fetch(`/users/${wingmanUser.id}/itineraries`).then(res => res.json()).then(data => {
                setItineraries(data);
            })
        }
    }, [wingmanUser])

    return (
        <>
            {wingmanUser ?
            <div className='flex flex-row justify-center items-center'>
                {itineraries.length > 0 ?
                    itineraries.map(itinerary => {
                        return (
                            <button>
                                <ItineraryCard itinerary={itinerary} />
                            </button>
                        )
                    }) :
                    <p className='text-2xl'>No Itineraries</p>
                }
            </div> :
            <div className='flex flex-row justify-center items-center h-screen'>
                <p className='text-2xl'>Please login to view your itineraries</p>
            </div>}
        </>
    );
};

export default Index;