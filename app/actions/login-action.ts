'use server'

type formDataType = {
    email: string,
    password: string
}

export const login = (values: formDataType) => {
    console.log(values);

}