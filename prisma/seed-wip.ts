import {PrismaClient, ReviewType} from '@prisma/client';
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
        { code: 'ORD', name: "O'Hare International Airport", location: 'Chicago' }
    ];
    for (const airport of airports) {
        await prisma.airport.create({ data: airport });
    }
}

async function createUsers() {
    const users = [
        { id: 'seed-user-1', username: 'user1', firstName: 'John', lastName: 'Doe', email: 'johndoe@example.com' },
        { id: 'seed-user-2', username: 'user2', firstName: 'Jane', lastName: 'Doe', email: 'janedoe@example.com' },
        { id: 'seed-user-3', username: 'user3', firstName: 'Jim', lastName: 'Beam', email: 'jimbeam@example.com' }
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
            const departTime = new Date();
            const arriveTime = addHours(departTime, Math.floor(Math.random() * 6) + 3);

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
                    airportId: type === 'AIRPORT' ? 1: null,
                    routeId: type === 'ROUTE' ? 0 : null,
                    tailNumberId: type === 'TAIL_NUMBER' ? 2 : null
                }
            });
        }
    }
}

async function main() {
    await createAirlines();
    await createAirports();
    await createUsers();
    await createTailNumbers();
    await createRoutes();
    await createFlights();
    await createReviews();
    console.log('Database seeding completed!');
}

main()
    .catch((e) => {
        console.error('Error during seeding:', e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
