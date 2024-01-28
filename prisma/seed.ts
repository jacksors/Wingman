import {PrismaClient, ReviewType, ChatroomType} from '@prisma/client';
import { addHours } from 'date-fns';

const prisma = new PrismaClient();

async function createAirlines() {
    const airlines = [
        { name: 'American Airlines' },
        { name: 'Delta Air Lines' },
        { name: 'United Airlines' }
    ];
    for (const airline of airlines) {
        await prisma.airline.create({ data: airline });
    }
}

async function createAirports() {
    const airports = [
        { code: 'JFK', name: 'John F. Kennedy International Airport', location: 'New York' },
        { code: 'LAX', name: 'Los Angeles International Airport', location: 'Los Angeles' },
        { code: 'ORD', name: "O'Hare International Airport", location: 'Chicago' },
        { code: 'DFW', name: 'Dallas/Fort Worth International Airport', location: 'Dallas' },
        { code: 'DEN', name: 'Denver International Airport', location: 'Denver' },
        { code: 'SFO', name: 'San Francisco International Airport', location: 'San Francisco' },
    ];
    for (const airport of airports) {
        await prisma.airport.create({ data: airport });
    }
}

async function createUsers() {
    const users = [
        { id: 'seed-user-1', username: 'user1', firstName: 'John', lastName: 'Doe', email: 'johndoe@example.com' },
        { id: 'seed-user-2', username: 'user2', firstName: 'Jane', lastName: 'Doe', email: 'janedoe@example.com' },
        { id: 'seed-user-3', username: 'user3', firstName: 'Jim', lastName: 'Beam', email: 'jimbeam@example.com' },
        { id: 'seed-user-4', username: 'user4', firstName: 'Jack', lastName: 'Daniels', email: 'test@test.com' },
        { id: 'seed-user-5', username: 'user5', firstName: 'John', lastName: 'Smith', email: 'test2@test.com' },
        { id: 'seed-user-6', username: 'user6', firstName: 'Jane', lastName: 'Smith', email: 'test3@test.com'},
        { id: 'seed-user-7', username: 'user7', firstName: 'John', lastName: 'Appleseed', email: 'test4@test.com'}
    ];
    for (const user of users) {
        await prisma.user.create({ data: user });
    }
}

async function createTailNumbers() {
    const tailNumbers = [
        { number: 'N101AA', model: 'Boeing 737', airlineId: 1 },
        { number: 'N102AA', model: 'Boeing 737', airlineId: 1 },
        { number: 'N103AA', model: 'Boeing 737', airlineId: 1 }
    ];
    for (const tailNumber of tailNumbers) {
        await prisma.tailNumber.create({ data: tailNumber });
    }
}

async function createRoutes() {
    const airports = await prisma.airport.findMany();
    for (let i = 0; i < airports.length; i++) {
        for (let j = 0; j < airports.length; j++) {
            if (i !== j) {
                await prisma.route.create({
                    data: {
                        originId: airports[i].id,
                        destinationId: airports[j].id,
                    }
                });
            }
        }
    }
}

async function createFlights() {
    const routes = await prisma.route.findMany();
    const tailNumbers = await prisma.tailNumber.findMany();
    const airlines = await prisma.airline.findMany();
    const users = await prisma.user.findMany();

    for (const route of routes) {
        for (const airline of airlines) {
            let departTime = new Date();
            let arriveTime = addHours(departTime, Math.floor(Math.random() * 6) + 3);

            let flightPrefix = airline.name === 'American Airlines' ? 'AA' : airline.name === 'Delta Air Lines' ? 'DL' : 'UA';

            await prisma.flight.create({
                data: {
                    flightNumber: `${flightPrefix}${Math.floor(Math.random() * 1000)}`,
                    airlineId: airline.id,
                    tailNumberId: tailNumbers[Math.floor(Math.random() * tailNumbers.length)].id,
                    routeId: route.id,
                    departTime: departTime,
                    arriveTime: arriveTime,
                    users: {
                        connect: users.map(user => ({ id: user.id }))
                    }
                }
            });

            departTime = new Date();
            arriveTime = addHours(departTime, Math.floor(Math.random() * 6) + 3);
            await prisma.flight.create({
                data: {
                    flightNumber: `AA${Math.floor(Math.random() * 1000)}`,
                    airlineId: airline.id,
                    tailNumberId: tailNumbers[Math.floor(Math.random() * tailNumbers.length)].id,
                    routeId: route.id,
                    departTime: departTime,
                    arriveTime: arriveTime,
                    users: {
                        connect: users.map(user => ({ id: user.id }))
                    }
                }
            });
        }
    }
}

async function createIteneraries() {
    const users = await prisma.user.findMany();
    const flights = await prisma.flight.findMany();

    for (const user of users) {
        await prisma.itenerary.create({
            data: {
                userId: user.id,
                flights: {
                    connect: flights.map(flight => ({ id: flight.id })).filter(_ => Math.random() < 0.5)
                }
            }
        });
    }

}

async function createReviews() {
    const users = await prisma.user.findMany();
    const airports = await prisma.airport.findMany();
    const routes = await prisma.route.findMany();
    const tailNumbers = await prisma.tailNumber.findMany();

    const reviewTypes = [ReviewType.ROUTE, ReviewType.AIRPORT, ReviewType.TAIL_NUMBER];

    for (const user of users) {
        for (const type of reviewTypes) {
            await prisma.review.create({
                data: {
                    title: `Review by ${user.username}`,
                    content: `This is a review about ${type.toLowerCase()}.`,
                    rating: Math.floor(Math.random() * 5) + 1,
                    reviewType: type,
                    userId: user.id,
                    airportId: type === 'AIRPORT' ? airports[Math.floor(Math.random() * airports.length)].id : null,
                    routeId: type === 'ROUTE' ? routes[Math.floor(Math.random() * routes.length)].id : null,
                    tailNumberId: type === 'TAIL_NUMBER' ? tailNumbers[Math.floor(Math.random() * tailNumbers.length)].id : null
                }
            });
        }
    }
}

async function createChatrooms() {
    const airports = await prisma.airport.findMany();
    const planes = await prisma.tailNumber.findMany();

    for (const airport of airports) {
        await prisma.chatroom.create({
            data: {
                type: ChatroomType.AIRPORT,
                airportId: airport.id
            }
        });
    }
    for (const plane of planes) {
        await prisma.chatroom.create({
            data: {
                type: ChatroomType.PLANE,
                tailNumberId: plane.id
            }
        });
    }
}

function main() {
    createAirlines().then(_ => {
        createAirports().then(_ => {
            createUsers().then(_ => {
                createTailNumbers().then(_ => {
                    createRoutes().then(_ => {
                        createFlights().then(_ => {
                            createReviews().then(_ => {
                                createIteneraries().then(_ => {
                                    createChatrooms().then(_ => {
                                        prisma.$disconnect();
                                        console.log('Database seeding completed!');
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}

main()