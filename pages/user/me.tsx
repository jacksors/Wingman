import React, {ChangeEventHandler, FormEventHandler, useEffect, useState} from 'react';
import {useUser} from "@auth0/nextjs-auth0/client";
import type { User } from '@prisma/client';
import { ModeToggle } from '@/components/mode-toggle';
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

const Me =  () => {
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [usernameIsSet, setUsernameIsSet] = useState(false);

    const { user, error, isLoading } = useUser();
    const [wingmanUser, setWingmanUser] = useState<User>();

    useEffect( () => {
        fetch(`/api/users/${user?.sub}`, {
            method: 'GET'
        }).then(res => {
            if (res.status === 200) {
                res.json().then((data: User) => {
                    setWingmanUser(data);
                })
            } else {
                return null
            }
        })
    }, [isLoading]);

    useEffect( () => {
        if (wingmanUser) {
            setUsername(wingmanUser.username);
            setFirstName(wingmanUser.firstName);
            setLastName(wingmanUser.lastName);
            setUsernameIsSet(true);
        }
        console.log(wingmanUser);
    }, [wingmanUser]);

    const handleSubmit: FormEventHandler<HTMLButtonElement> = async (event) => {
        event.preventDefault();
        const newUser: User = {
            id: user?.sub!,
            email: user?.email!,
            username: username,
            firstName: firstName,
            lastName: lastName,
        };
        const res = await fetch(`/api/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify([newUser])
        });

        if (res.status === 200) {
            setUsernameIsSet(true);
        } else {
            alert('Something went wrong');
        }
    };

    const handleUsernameChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        setUsername(event.target.value);
    };

    const handleFirstnameChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        setFirstName(event.target.value);
    };

    const handleLastnameChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        setLastName(event.target.value);
    };

    if (isLoading) return <div>Loading...</div>;

    if (!usernameIsSet) return (
        <div className={`flex flex-row justify-center items-center h-screen ${inter.className}`}>
            <form>
                <div className='flex flex-col justify-center items-center'>
                    <h1 className="text-4xl">Welcome to Wingman!</h1>
                    <h2 className="text-xl py-3">We need a few more details to finish you account</h2>
                    <div className="flex flex-col justify-center items-center gap-3">
                        <div className="flex flex-row justify-center items-center gap-3">
                            <label htmlFor="username">Username:</label>
                            <input
                                type="text"
                                id="username"
                                className="border-2 border-secondary bg-transparent rounded h-10"
                                onChange={handleUsernameChange}
                            />
                        </div>
                        <div className="flex flex-row justify-center items-center gap-3">
                            <label htmlFor="firstName">First Name:</label>
                            <input
                                type="text"
                                id="firstName"
                                className="border-2 border-secondary bg-transparent rounded h-10"
                                onChange={handleFirstnameChange}
                            />
                        </div>
                        <div className="flex flex-row justify-center items-center gap-3">
                            <label htmlFor="lastName">Last Name:</label>
                            <input
                                type="text"
                                id="lastName"
                                className="border-2 border-secondary bg-transparent rounded h-10"
                                onChange={handleLastnameChange}
                            />
                        </div>
                    </div>
                    <button className="mt-5 bg-accent p-3 rounded" type="submit" onClick={handleSubmit}>Submit</button>
                </div>
            </form>
            <ModeToggle/>
        </div>
    );

    return (
        <div className='flex flex-row justify-center items-center h-screen'>
            <div className='flex flex-col justify-center items-center'>
                <h1>Welcome to Wingman!</h1>
                <h2>Your username is {username}</h2>
            </div>
        </div>
    )

};

export default Me;