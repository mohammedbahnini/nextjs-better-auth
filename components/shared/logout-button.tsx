'use client'
import { authClient } from '@/lib/auth-client'
import { redirect } from 'next/navigation'
import React from 'react'
import { Button } from '../ui/button'

interface Props { }

function LogoutButton(props: Props) {
    const { } = props


    const logout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    redirect('/')
                },
            },
        })
    }


    return (
        <Button onClick={logout}>Log out</Button>
    )
}

export default LogoutButton
