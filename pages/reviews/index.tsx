import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Airport, Flight, Itenerary } from "@prisma/client";
import { ItineraryWithAverages } from "@/types/itineraries";
import { Card } from "@/components/ui/card";
import { ItineraryCard } from "@/components/itinerary/itinerarycard";

export default function ReviewHome() {
  const { user } = useUser();
  const [itineraries, setItineraries] = useState<ItineraryWithAverages[]>([]);

  const fetchItineraries = async () => {
    fetch(`/api/users/${user?.sub}/itineraries`, {
      method: "GET",
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data: ItineraryWithAverages[]) => {
          setItineraries(data);
          console.log(data);
        });
      } else {
        return null;
      }
    });
  }

  useEffect(() => {
    if (user) {
      fetchItineraries();
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to <a href="/">Wingman!</a>
        </h1>

        <p className="mt-3 text-2xl">
          Your itineraries:{" "}
          {itineraries.map((itinerary, index) => {
            return (
                <ItineraryCard key={'itinerary-' + index}  itineraryWithAverages={itinerary} />
  
            );
            })}
        </p>
      </main>
    </div>
  );
}

