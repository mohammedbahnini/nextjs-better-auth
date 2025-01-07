import React from 'react'
import { Button } from '../ui/button'
import { LoaderCircle } from 'lucide-react'

interface Props {
    isPending: boolean
}

function LoginButton(props: Props) {
    const { isPending } = props

    return (
        <Button type='submit' className='w-full' disabled={isPending}>
            {isPending && (<LoaderCircle className='animate-spin' />)}
            {!isPending && 'Log in'}
        </Button>
    )
}

export default LoginButton
