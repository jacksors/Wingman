import React, {useEffect, useState} from 'react';
import {Airport, Flight, Route, User} from "@prisma/client";
import {Card} from "@/components/ui/card";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {ButtonIcon, CaretSortIcon, CheckIcon} from "@radix-ui/react-icons";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem} from "@/components/ui/command";
import {cn} from "@/lib/utils";
import {Calendar} from "@/components/ui/calendar";

export interface Props {
    key: number;
    airports: Airport[];
    setFlightCallback: (flight: { flightNo: string, date: Date, originCode: string, destinationCode: string }) => void;
    deleteCallback: () => void;
};

export function FlightAdd({airports, setFlightCallback, deleteCallback}: Props) {
    const [flightNoOpen, setFlightNoOpen] = React.useState(false);
    const [flightNo, setFlightNo] = React.useState<string>('');
    const [originCode, setOriginCode] = React.useState<string>('');
    const [originOpen, setOriginOpen] = React.useState(false);
    const [destinationCode, setDestinationCode] = React.useState<string>('');
    const [destinationOpen, setDestinationOpen] = React.useState(false);

    const [date, setDate] = useState<Date | undefined>(undefined);

    const [localFlight, setLocalFlight] = useState<{flightNo: string, date: Date | null, originCode: string, destinationCode: string}>({flightNo: '', date: null, originCode: '', destinationCode: ''});

    useEffect(() => {
        if (date && destinationCode !== '' && originCode !== '') {
            setLocalFlight({flightNo: flightNo, date: date, originCode: originCode, destinationCode: destinationCode});
            setFlightCallback({flightNo: flightNo, date: date, originCode: originCode, destinationCode: destinationCode});
            console.log(localFlight);
        }

    }, [flightNo, date, originCode, destinationCode])

    // Get possible flights for a selected date
    const [availableFlights, setAvailableFlights] = useState<{id: number, flightNumber: string, route: {origin: {id: number, code: string, name: string, location: string}, destination: {id: number, code: string, name: string, location: string}} & {id: number, originId: number, destinationId: number}}[]>([]);
    useEffect(() => {
        console.log(localFlight);
        if (localFlight.date && localFlight.destinationCode && localFlight.originCode) {
            const url = `/api/flights?from=${localFlight.destinationCode}&to=${localFlight.originCode}`;
            console.log(url);
            fetch(url).then(res => res.json()).then(data => {
                setAvailableFlights(data);
            })
        }
    }, [localFlight])

    const deleteThis = () => {
        setFlightNo('');
        setDate(undefined);
        setOriginCode('');
        setDestinationCode('');
        deleteCallback();
    }

    return (
        <div className={'flex flex-row flex-wrap'}>
            <Card className={'flex flex-col justify-center items-center p-4 bg-secondary'}>
                <div className={'flex flex-row items-center justify-center mb-2 w-full'}>
                    <div className='w-1/6 '> </div>
                    <h2 className={'text-xl text-center w-2/3'}>Date</h2>
                    <Button className='w-1/6 bg-destructive' onClick={deleteThis}>
                        <span className="material-symbols-outlined">
                            close
                        </span>
                    </Button>
                </div>
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className={'rounded-md border shadow bg-blue-900 bg-background drop-shadow-md'}

                />
                <h2 className={'text-xl mt-4 pb-2'}>Origin airport</h2>
                <Popover open={originOpen} onOpenChange={setOriginOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            role={'combobox'}
                            aria-expanded={originOpen}
                            className={'justify-between'}>
                            {originCode
                                ? `${originCode}`
                                : "Select airport..."}
                            <CaretSortIcon className={'ml-2 h-4 w-4 shrink-0 opacity-50'}/>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className={'w-[200px] p-0'}>
                        <Command>
                            <CommandInput placeholder={'Search airports...'} className={'h-9'}/>
                            <CommandEmpty>No airport found.</CommandEmpty>
                            <CommandGroup>
                                {airports.map(airport => (
                                    <CommandItem
                                        key={airport.code}
                                        value={airport.code}
                                        onSelect={() => {
                                            setOriginCode(airport.code);
                                            setOriginOpen(false);
                                        }}
                                    >
                                        {airport.name} - ({airport.code})
                                        <CheckIcon
                                            className={cn('ml-auto h-4 w-4', airport.code === originCode ? 'opacity-100' : 'opacity-0')}/>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </Command>
                    </PopoverContent>
                </Popover>
                <h2 className={'text-xl mt-4 pb-2'}>Destination airport</h2>
                <Popover open={destinationOpen} onOpenChange={setDestinationOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            role={'combobox'}
                            aria-expanded={destinationOpen}
                            className={'justify-between'}>
                            {destinationCode
                                ? `${destinationCode}`
                                : "Select flight number..."}
                            <CaretSortIcon className={'ml-2 h-4 w-4 shrink-0 opacity-50'}/>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className={'w-[200px] p-0'}>
                        <Command>
                            <CommandInput placeholder={'Search airports...'} className={'h-9'}/>
                            <CommandEmpty>No airport found.</CommandEmpty>
                            <CommandGroup>
                                {airports.map(airport => (
                                    <CommandItem
                                        key={airport.code}
                                        value={airport.code}
                                        onSelect={() => {
                                            setDestinationCode(airport.code);
                                            setDestinationOpen(false);
                                        }}
                                    >
                                        {airport.name} - ({airport.code})
                                        <CheckIcon
                                            className={cn('ml-auto h-4 w-4', airport.code === destinationCode ? 'opacity-100' : 'opacity-0')}/>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </Command>
                    </PopoverContent>
                </Popover>
                {date && originCode && destinationCode
                    ?
                    <>
                        <h2 className={'text-xl mt-4'}>Flight number</h2>
                        <Popover open={flightNoOpen} onOpenChange={setFlightNoOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    role={'combobox'}
                                    aria-expanded={flightNoOpen}
                                    className={'justify-between'}>
                                    {flightNo
                                        ? `${flightNo}`
                                        : "Select flight number..."}
                                    <CaretSortIcon className={'ml-2 h-4 w-4 shrink-0 opacity-50'}/>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className={'w-[200px] p-0'}>
                                <Command>
                                    <CommandInput placeholder={'Search airports...'} className={'h-9'}/>
                                    <CommandEmpty>No flights found.</CommandEmpty>
                                    <CommandGroup>
                                        {availableFlights.map(flight => (
                                            <CommandItem
                                                key={flight.flightNumber}
                                                value={flight.flightNumber}
                                                onSelect={() => {
                                                    setFlightNo(flight.flightNumber);
                                                    setFlightNoOpen(false);
                                                }}
                                            >
                                                {flight.flightNumber}
                                                <CheckIcon
                                                    className={cn('ml-auto h-4 w-4', flightNo === flight.flightNumber ? 'opacity-100' : 'opacity-0')}/>
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </>
                    : <></>}
            </Card>
        </div>
    );
}
