import React, {ChangeEventHandler, FormEventHandler, useEffect, useState} from 'react';
import {useUser} from "@auth0/nextjs-auth0/client";
import type { User } from '@prisma/client';

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
    }, [wingmanUser]);

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        alert(`Username submitted: ${username}`);
        const newUser: User = {
            id: user?.sub!,
            email: user?.email!,
            username: username,
            firstName: firstName,
            lastName: lastName,
        };
        // Here you can add the logic to handle the submitted username
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
        <div className='flex flex-row justify-center items-center h-screen'>
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col justify-center items-center'>
                    <h1>Welcome to Wingman!</h1>
                    <h2>Please create a username</h2>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={handleFirstnameChange}
                    />
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={handleLastnameChange}
                    />
                    <button type="submit">Submit</button>
                </div>
            </form>
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