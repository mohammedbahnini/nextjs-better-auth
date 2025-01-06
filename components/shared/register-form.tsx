'use client'
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import Link from 'next/link';
import { FormInput } from 'lucide-react';
import { Button } from '../ui/button';
import { register } from '@/app/actions/register-action';

interface Props { }

const formSchema = z.object({
    name: z.string().min(1, 'Name is required '),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z.string().min(1, 'Password is required'),
    confirmPassword: z.string().min(1, 'Confirm password is required')
}).refine(data => {
    return data.password === data.confirmPassword
}, {
    message: 'Confirm password is wrong',
    path: ['confirmPassword']
})

export type formDataType = z.infer<typeof formSchema>;



function RegisterForm(props: Props) {
    const { } = props

    const form = useForm<formDataType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: 'jhon doe',
            email: 'jhondoe@examle.com',
            password: '123',
            confirmPassword: '123'
        }
    })


    const onSubmit = async (values: formDataType) => {
        const result = await register(values)

        if (result.success) {

        }
    }

    const { isSubmitting } = form.formState;


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

                <Button type='submit' className='w-full'>Register</Button>

                <p className='text-sm text-center text-gray-600'>You have an account , <Link href='/' className='underline text-blue-400'>Log in</Link></p>
            </form>
        </Form>
    )
}

export default RegisterForm
