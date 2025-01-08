'use server'

import {auth} from "@/auth";
import axios, {AxiosError} from "axios";
import {APIError} from "better-auth/api";
import {formDataType} from '@/lib/schemas'


export const login = async (values: formDataType) => {
    console.log(values.email);
    console.log(values.password)

    // call the api auth in the server
    try {

        // you can add addition verification for the values coming from the client
        // using safeParse will not throw an error
        // const { success , error , data } = formSchema.safeParse(values);
        // console.log( error?.flatten() )
        // console.log( error?.formErrors )


        // basically better-auth call the api to sign in the user with the given data
        // const response = await axios.post('http://localhost:3000/api/auth/sign-in/email' , {
        //     email: values.email,
        //     password: values.password,
        // });
        // console.log(response.data);


        // this is an example of calling auth api directly
        const response = await auth.api.signInEmail({
            body: {...values}
        });
        console.log(response);


    } catch (error) {

        //console.log(error);
        // catch if any error
        // if you use axios to sign in
        if (error instanceof AxiosError) {
            // you can access the error with th following line
            console.log(error.response?.data);
        }

        // if you use auth api to sign in
        if (error instanceof APIError) {
            // access the error code and message
            console.log(error.body.message)
            console.log(error.body.code)

        }
    }
}