import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Airport, Flight, Itenerary } from "@prisma/client";

interface ItineraryWithFlightInfo extends Itenerary {
    flights: FlightWithOriginAndDest[];
}

interface FlightWithOriginAndDest extends Flight {
  route: {
    origin: Airport;
    destination: Airport;
  };
  originAverageRating: number;
  destinationAverageRating: number;
}

export default function ReviewHome() {
  const { user } = useUser();
  const [itineraries, setItineraries] = useState<ItineraryWithFlightInfo[]>([]);

  const fetchItineraries = async () => {
    fetch(`/api/users/${user?.sub}/itineraries`, {
      method: "GET",
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data: ItineraryWithFlightInfo[]) => {
          setItineraries(data);
          console.log(data);
        });
      } else {
        return null;
      }
    });
  }

  const fetchAverageRatings = async (itinerary : ItineraryWithFlightInfo) => {
    const flights = itinerary.flights;
    var updatedFlights : FlightWithOriginAndDest[] = [];
    for (const flight of flights) {
      var updatedFlight = flight;
      const airportId = flight.route.destination.id;
      fetch(`/api/airports/${airportId}/reviews/average`, {
        method: "GET",
      }).then((res) => {
        if (res.status === 200) {
          res.json().then((data: number) => {
            updatedFlight.destinationAverageRating = data;
          });
        } else {
          return null;
        }
      });

      const tailNumberId = flight.tailNumberId;
      fetch(`/api/planes/${tailNumberId}/reviews/average`, {
        method: "GET",
      }).then((res) => {
        if (res.status === 200) {
          res.json().then((data: number) => {
            updatedFlight.originAverageRating = data;
          });
        } else {
          return null;
        }
      });
      updatedFlights.push(updatedFlight);
    }
    setItineraries(itineraries.map((itinerary) => {
      for (const flight of itinerary.flights) {
        if (flight.id === updatedFlights[0].id) {
          itinerary.flights = updatedFlights;
        }
      }
      return itinerary;
    }
    ));
  }


  useEffect(() => {
    fetchItineraries()
  }, [user]);

  useEffect(() => {
    for (const itinerary of itineraries) {
      fetchAverageRatings(itinerary);
    }
  }, [itineraries]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to <a href="/">Wingman!</a>
        </h1>

        <p className="mt-3 text-2xl">
          Your itineraries:{" "}
          {itineraries.map((itinerary) => (
            <div key={itinerary.id}>
              {
                itinerary.flights.map((flight) => (
                  <div key={flight.id}>
                    {flight.originAverageRating}
                  </div>
                ))
              }
            </div>
          ))}
        </p>
      </main>
    </div>
  );
}

