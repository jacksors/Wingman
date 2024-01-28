import React, {useEffect, useState} from 'react';
import {Airport, User} from "@prisma/client";
import {useUser} from "@auth0/nextjs-auth0/client";
import {Card} from "@/components/ui/card";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {CaretSortIcon, CheckIcon} from "@radix-ui/react-icons";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem} from "@/components/ui/command";
import {cn} from "@/lib/utils";

export interface Props {
    airports: Airport[];
    setOriginAirportCallback: (airport: Airport) => void;
    setDestinationAirportCallback: (airport: Airport) => void;
};

export function FlightAdd({airports, setOriginAirportCallback, setDestinationAirportCallback}: Props) {
    const [originAirportOpen, setOriginAirportOpen] = React.useState(false);
    const [originAirport, setOriginAirport] = React.useState<Airport | null>(null);
    const [destinationAirportOpen, setDestinationAirportOpen] = React.useState(false);
    const [destinationAirport, setDestinationAirport] = React.useState<Airport | null>(null);

    useEffect(() => {
        if (originAirport) setOriginAirportCallback(originAirport);
    }, [originAirport])

    useEffect(() => {
        if (destinationAirport) setDestinationAirportCallback(destinationAirport);
    }, [destinationAirport])

    return (
        <div>
            <Card className={'flex flex-col justify-center items-center'}>
                <h2 className={'text-xl mt-4'}>Origin airport</h2>
                <Popover open={originAirportOpen} onOpenChange={setOriginAirportOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            role={'combobox'}
                            aria-expanded={originAirportOpen}
                            className={'justify-between'}>
                            {originAirport
                                ? `${originAirport.name} (${originAirport.code})`
                                : "Select origin airport..."}
                            <CaretSortIcon className={'ml-2 h-4 w-4 shrink-0 opacity-50'} />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className={'w-[200px] p-0'}>
                        <Command>
                            <CommandInput placeholder={'Search airports...'} className={'h-9'} />
                            <CommandEmpty>No airport found.</CommandEmpty>
                            <CommandGroup>
                                {airports.map(airport => (
                                    <CommandItem
                                        key={airport.code}
                                        value={airport.code}
                                        onSelect={() => {
                                            setOriginAirport(airport);
                                            setOriginAirportOpen(false);
                                        }}
                                    >
                                        {airport.name} ({airport.code})
                                        <CheckIcon
                                            className={cn('ml-auto h-4 w-4', originAirport === airport ? 'opacity-100' : 'opacity-0')} />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </Command>
                    </PopoverContent>
                </Popover>
                <h2 className={'text-xl mt-4'}>Destination airport</h2>
                <Popover open={destinationAirportOpen} onOpenChange={setDestinationAirportOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            role={'combobox'}
                            aria-expanded={destinationAirportOpen}
                            className={'justify-between'}>
                            {destinationAirport
                                ? `${destinationAirport.name} (${destinationAirport.code})`
                                : "Select destination airport..."}
                            <CaretSortIcon className={'ml-2 h-4 w-4 shrink-0 opacity-50'} />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className={'w-[200px] p-0'}>
                        <Command>
                            <CommandInput placeholder={'Search airports...'} className={'h-9'} />
                            <CommandEmpty>No airport found.</CommandEmpty>
                            <CommandGroup>
                                {airports.map(airport => (
                                    <CommandItem
                                        key={airport.code}
                                        value={airport.code}
                                        onSelect={() => {
                                            setDestinationAirport(airport);
                                            setDestinationAirportOpen(false);
                                        }}
                                    >
                                        {airport.name} ({airport.code})
                                        <CheckIcon
                                            className={cn('ml-auto h-4 w-4', destinationAirport === airport ? 'opacity-100' : 'opacity-0')} />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </Command>
                    </PopoverContent>
                </Popover>
            </Card>
        </div>
    );
}
