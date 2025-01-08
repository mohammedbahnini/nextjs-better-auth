import { betterAuth , BetterAuthOptions } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./lib/db";



export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "mysql"
    }),
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: false,
        autoSignIn: false
    }
} satisfies  BetterAuthOptions);