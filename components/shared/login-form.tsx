"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import LoginButton from "./login-button";
import { redirect } from "next/navigation";
import Message from "./message";

interface Props { }

// i nee to move all the schemas in one file
const formSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalide email"),
  password: z.string().min(1, "Password is required"),
});

type formDataType = z.infer<typeof formSchema>;

function LoginForm(props: Props) {
  const { } = props;

  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [messageIsVisible, setMessageIsVisible] = useState(false);
  const [message, setMessage] = useState("");

  const form = useForm<formDataType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // i need to move this method to be execute in the server using auth.api or axios
  // i nee also to find a solution for state management for the errors and the success messages
  const onSubmit = (values: formDataType) => {
    authClient.signIn.email(
      { ...values },
      {
        onRequest: (ctx) => {
          setIsPending(true);
          setMessageIsVisible(false);
        },
        onError: (ctx) => {
          console.log(ctx.error);
          setIsPending(false);
          setIsSuccess(false);
          setMessageIsVisible(true);
          setMessage(ctx.error.message);
        },
        onSuccess: () => {
          setIsPending(false);
          setIsSuccess(true);
          setMessageIsVisible(true);
          setMessage("You are logged in !");
          redirect("/dashboard");
        },
      },
    );
  };

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  {...field}
                  placeholder="jhondoe@exemple.com"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} placeholder="****" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Message
          isSuccess={isSuccess}
          isVisible={messageIsVisible}
          message={message}
        />
        <LoginButton isPending={isPending} />

        <p className="text-sm text-center text-gray-600">
          You dont have an account ,{" "}
          <Link href="/register" className="underline text-blue-400">
            Create one
          </Link>
        </p>
      </form>
    </Form>
  );
}

export default LoginForm;
