import { auth } from '@/auth';
import LogoutButton from '@/components/shared/logout-button';
import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client';
import { Session } from 'better-auth';
import { router } from 'better-auth/api';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react'

interface Props { }

async function Page(props: Props) {
    const { } = props;

    const { user } = await auth.api.getSession({
        headers: await headers() // you need to pass the headers object.
    });
    console.log(user);


    return (
        <div className='h-screen flex flex-col items-center justify-center '>


            <div className='text-center text-white mb-10'>
                <p className='text-center'>{user.name}</p>
                <p>{user.email}</p>
            </div>

            <LogoutButton />
        </div>
    )
}

export default Page
