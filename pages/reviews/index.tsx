import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Airport, Flight, Itenerary } from "@prisma/client";
import { ItineraryWithAverages } from "@/types/itineraries";
import { ItineraryCard } from "@/components/itinerary/itinerarycard";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {Inter} from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function ReviewHome() {
  const { user } = useUser();
  const [itineraries, setItineraries] = useState<ItineraryWithAverages[]>([]);
  const [airports, setAirports] = useState<Airport[]>([]);

  useEffect(() => {
        if (user) {
            fetch(`/api/users/${user.sub}/itineraries`).then(res => res.json()).then(data => {
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
                setItineraries(data);
            })
        }
    }, [user])

    useEffect(() => {
        const airportCodeSet = new Set<string>();
        itineraries.forEach(itinerary => {
            itinerary.flights.forEach(flight => {
                airportCodeSet.add(flight.route.origin.code); // Assuming 'code' is a unique identifier
                airportCodeSet.add(flight.route.destination.code);
            });
        });
        const airportCodesArray = Array.from(airportCodeSet);
        const airportArray = airportCodesArray.map(code => {
            const allAirports = itineraries.flatMap(itinerary => itinerary.flights.flatMap(flight => [flight.route.origin, flight.route.destination]));
            return allAirports.find(airport => airport.code === code);
        })
        setAirports(airportArray as Airport[]);

    }, [itineraries])

  return (
    <div>
            {user ?
                <div className='flex flex-col justify-center items-center gap-5 px-24 py-12 pt-24 w-full'>
                    <h1 className='text-xl text-gray-700 italic'>Click an itinerary to view reviews on flights and airports!</h1>
                    {itineraries.length > 0 ?
                        itineraries.map((itinerary, index) => {
                            return (
                                <Dialog key={'itinerary-' + index}>
                                    <DialogTrigger asChild>
                                        <button className='w-full'>
                                            <ItineraryCard itinerary={itinerary}/>
                                        </button>
                                    </DialogTrigger>
                                    <DialogContent className={inter.className}>
                                        <DialogHeader className={'text-2xl'}>
                                            Flights
                                        </DialogHeader>
                                        <div className='flex flex-col justify-center items-center'>
                                            <div className={'grid grid-cols-4 items-center w-full'}>
                                            <span className="material-symbols-outlined">
                                                pin
                                            </span>
                                                <span className="material-symbols-outlined">
                                                flight_takeoff
                                            </span>
                                                <span className="material-symbols-outlined">
                                                flight_land
                                            </span>
                                            </div>
                                            {itinerary.flights.map((flight, index) => {
                                                return (
                                                    <div className='grid grid-cols-4 items-center w-full my-2'
                                                         key={'flight-' + index}>
                                                        <p>{flight.flightNumber}</p>
                                                        <p>{flight.route.origin.code}</p>
                                                        <p>{flight.route.destination.code}</p>
                                                        <Button>
                                                            <Link
                                                                href={`/reviews/planes/${flight.tailNumberId}`}>Reviews</Link>
                                                        </Button>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        <DialogHeader className={'text-2xl'}>
                                            Airports
                                        </DialogHeader>
                                        <div className='flex flex-col justify-center items-center'>
                                            <div className={'grid grid-cols-4 items-center w-full'}>
                                            <span className="material-symbols-outlined">
                                                pin
                                            </span>
                                                <span className="material-symbols-outlined">
                                                map
                                            </span>
                                                <div></div>
                                            </div>
                                            {airports.map((airport, index) => {
                                                return (
                                                    <div className='grid grid-cols-4 items-center w-full my-2'
                                                         key={'airport-' + index}>
                                                        <p>{airport.code}</p>
                                                        <p>{airport.location}</p>
                                                        <div></div>
                                                        <Button>
                                                            <Link href={`/reviews/airports/${airport.id}`}>Reviews</Link>
                                                        </Button>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            )
                        }) :
                        <p className='text-2xl'>No Itineraries</p>
                    }
                </div> :
                <div className='flex flex-row justify-center items-center h-screen'>
                    <p className='text-2xl'>Please login to view and leave reviews!</p>
                </div>}
        </div>
  );
}

