import React from 'react'
import { Button } from '../ui/button'
import { LoaderCircle } from 'lucide-react'

interface Props {
    isLoading: boolean
}

function RegisterButton(props: Props) {
    const { isLoading } = props

    return (
        <Button type='submit' className='w-full' disabled={isLoading}>
            {isLoading && (<LoaderCircle className='animate-spin' />)}
            {!isLoading && 'Register'}
        </Button>
    )
}

export default RegisterButton
