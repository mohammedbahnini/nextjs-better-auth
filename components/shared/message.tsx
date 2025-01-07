import React from 'react'
import { CircleAlert, ThumbsUp } from 'lucide-react'
import clsx from 'clsx'


interface Props {
    message: string | undefined
    isSuccess: boolean | undefined,
    isVisible: boolean
}



function Message(props: Props) {


    const { message, isSuccess, isVisible } = props


    if (isVisible) {
        return (
            <div className={clsx(' border-[1px] rounded-lg px-4 py-2',
                isSuccess && 'bg-emerald-100 border-emerald-300',
                !isSuccess && 'bg-red-100 border-red-500'
            )}>
                <p className={clsx(' flex items-center gap-2',
                    isSuccess && 'text-emerald-600',
                    !isSuccess && 'text-red-500')}>
                    {isSuccess && <ThumbsUp className='w-4' />}
                    {!isSuccess && <CircleAlert className='w-4' />}
                    {message}</p>
            </div>
        )
    }
    else return null;
}

export default Message
