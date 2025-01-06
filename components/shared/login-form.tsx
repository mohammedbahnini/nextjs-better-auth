'use client'
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Link from 'next/link';

interface Props { }

const formSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalide email'),
    password: z.string().min(1, 'Password is required')
})

type formDataType = z.infer<typeof formSchema>;




function LoginForm(props: Props) {
    const { } = props



    const form = useForm<formDataType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit = (values: formDataType) => {
        console.log(values);


    }

    return (
        <Form {...form}>

            <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>

                <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type='text' {...field} placeholder='jhondoe@exemple.com' />
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

                <Button type='submit' className='w-full'>Login</Button>


                <p className='text-sm text-center text-gray-600'>You dont have an account , <Link href='/register' className='underline text-blue-400'>Create one</Link></p>


            </form>
        </Form>
    )
}

export default LoginForm
