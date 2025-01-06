import Container from '@/components/shared/container'
import FormContainer from '@/components/shared/form-container'
import RegisterForm from '@/components/shared/register-form'
import React from 'react'

interface Props { }

function RegisterPage(props: Props) {
    const { } = props

    return (
        <Container className="min-h-screen flex items-center justify-center ">
            <FormContainer>
                <RegisterForm />
            </FormContainer>
        </Container>
    )
}

export default RegisterPage
