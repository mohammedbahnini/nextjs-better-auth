'use server'

import { auth } from "@/auth";
import { formDataType } from "@/lib/schemas";
import { APIError } from "better-auth/api";
import axios from 'axios';
import { request } from "@arcjet/next";
import { aj } from "../arcjet";



type registerResultType = {
    success: boolean
    message?: string
    error?: string
}


export const register = async (values: formDataType): Promise<registerResultType> => {

    try {


        const { name, email, password } = values;

        // add some checks ( zod safeParse , user already exists, ... ), but now lets just keep it simple


        // register using axios ( data need to be stringified )
        // const data = JSON.stringify({
        //     "name": "jhon doe",
        //     "email": "jhondoe@example.com",
        //     "password": "123456789"
        // });
        // axios.post('http://localhost:3000/api/auth/sign-up/email', data)
        //     .then(({ data }) => console.log(data))
        //     .catch(e => console.log(e.response.data))


        // we can check if the email is valid using arcjet 
        const req = await request();

        // Call Arcjet protect
        const decision = await aj.protect(req, { email: email });
        console.log("Decision:", decision);


        if (decision.isDenied() && decision.reason.isEmail()) {

            if (decision.reason.emailTypes.includes("DISPOSABLE")) {
                return {
                    success: false,
                    message: 'We do not allow disposable email addresses.'
                }
            } else if (decision.reason.emailTypes.includes("NO_MX_RECORDS")) {
                return {
                    success: false,
                    message: 'Please try with a real email or an active one !'
                }
            } else {
                // This is a catch all
                return {
                    success: false,
                    message: 'An error occured while checking your email , please try later !'
                }
            }
        }





        const response = await auth.api.signUpEmail({
            body: {
                email,
                name,
                password
            }
        })
        console.log(response);


        if (response.user) {
            return {
                success: true,
                message: 'You have creatd an account'
            }
        } else
            return {
                success: false,
                message: 'An error occured while creating your account , please try later !'
            }



    } catch (error) {
        if (error instanceof APIError) {
            return {
                success: false,
                message: error.body.message
            }
        }
        else {
            return {
                success: true,
                message: 'You have creatd an account'
            }
        }

    }


}