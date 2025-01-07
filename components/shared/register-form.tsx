'use client'
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import Link from 'next/link';
import { Button } from '../ui/button';
import { register } from '@/app/actions/register-action';
import { formDataType, formSchema } from '@/lib/schemas';
import Message from './message';
import RegisterButton from './register-button';
import { authClient } from '@/lib/auth-client';

interface Props { }





function RegisterForm(props: Props) {


    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [isLoading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | undefined>('')
    const [messageIsVisible, setMessageIsVisible] = useState(false)


    const { } = props

    const form = useForm<formDataType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: 'jhon doe',
            email: 'jhondoe@example.com',
            password: '123456789',
            confirmPassword: '123456789'
        }
    })


    const onSubmit = async (values: formDataType) => {


        setLoading(true);
        setIsSuccess(false);
        setMessageIsVisible(false);
        setMessage('');


        authClient.signUp.email({ ...values }, {
            onSuccess(context) {

                setLoading(false);
                setIsSuccess(true);
                setMessageIsVisible(true);
                setMessage('Account created !');

            },
            onError(context) {
                console.log(context.error);

                setLoading(false);
                setIsSuccess(false);
                setMessageIsVisible(true);
                setMessage(context.error.message);


            },
        });





    }



    return (
        <Form {...form} >

            <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)} >


                <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input type='text' {...field} placeholder='jhon doe' />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />



                <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type='text' {...field} placeholder='jhondoe@example.com' />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />




                <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type='password' {...field} placeholder='****' />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />




                <FormField
                    control={form.control}
                    name='confirmPassword'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm password</FormLabel>
                            <FormControl>
                                <Input type='password' {...field} placeholder='****' />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />


                <Message isSuccess={isSuccess} message={message} isVisible={messageIsVisible} />

                <RegisterButton isLoading={isLoading} />


                <p className='text-sm text-center text-gray-600'>You have an account , <Link href='/' className='underline text-blue-400'>Log in</Link></p>
            </form>
        </Form>
    )
}

export default RegisterForm
