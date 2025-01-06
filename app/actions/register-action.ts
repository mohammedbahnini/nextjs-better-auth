'use server'

import { formDataType } from "@/components/shared/register-form"
import { authClient } from "@/lib/auth-client";
import { CircleFadingArrowUp } from "lucide-react";

type registerResultType = {
    success: boolean,
    error?: string
}

export const register = async (values: formDataType): Promise<registerResultType> => {

    try {
        const { data, error } = await authClient.signUp.email({
            email: values.email,
            name: values.name,
            password: values.password,
            image: undefined
        });

        console.log(data);
        console.log(error);



        if (error) {
            return {
                success: false,
                error: error.message
            }
        }
        else {
            return {
                success: true
            }
        }
    } catch (error) {
        return {
            success: false,
            error: 'An error has occured !'
        }

    }

}