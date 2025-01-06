import Container from '@/components/shared/container'
import FormContainer from '@/components/shared/form-container'
import LoginForm from '@/components/shared/login-form'
import React from 'react'

interface Props { }

function LoginPage(props: Props) {
    const { } = props

    return (
        <Container className="min-h-screen flex items-center justify-center ">
            <FormContainer>
                <LoginForm />
            </FormContainer>
        </Container>
    )
}

export default LoginPage
