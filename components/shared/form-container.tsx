import React from 'react'

interface Props {
    children: React.ReactNode,
    className?: string
}

function FormContainer(props: Props) {
    const { children, className } = props

    return (
        <div className='bg-white max-w-3xl  rounded-xl p-5 w-96 '>
            {children}
        </div>
    )
}

export default FormContainer
