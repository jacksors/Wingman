import React, {useEffect, useState} from 'react';
import {useUser} from "@auth0/nextjs-auth0/client";
import {User} from "@prisma/client";
import {useRouter} from "next/router";

const Callback = () => {
    const { user, isLoading } = useUser();

    const router  = useRouter();

    useEffect(() => {
        if (user && !isLoading) {
            fetch(`/api/users/${user.sub}`).then(res => {
                res.json().then(data => {
                    if (data) {
                        router.push('/');
                    } else {
                        router.push('/user/me')
                    }
                })
            })
        }
    }, [isLoading]);

    return (
        <div>
        </div>
    );
};

export default Callback;