import { cn } from '@/lib/utils'
import React from 'react'

interface Props {
    children: React.ReactNode,
    className?: string
}

function Container(props: Props) {
    const { children, className } = props

    return (
        <div className={cn(className, 'px-6 md:px-4 lg:px-0 mx-auto max-w-screen-lg  ')}>
            {children}
        </div>
    )
}

export default Container
