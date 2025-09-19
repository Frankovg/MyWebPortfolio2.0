"use client";

import Link from "next/link";
import React, { useActionState } from "react";

import { logIn } from "@/actions/index";

import InputLogin from "./input-login";
import { SubmitButton } from "./submit-button";

const AuthForm = () => {
  const [logInError, dispatchLogIn, isPending] = useActionState(logIn, undefined);
  const inputs = ["Email", "Password"];

  return (
    <form
      action={dispatchLogIn}
      className="flex flex-col gap-y-4 md:gap-y-2 max-md:w-full max-md:px-4"
    >
      {inputs.map((input) => {
        const lowerCaseInput = input.toLowerCase();
        return (
          <InputLogin
            key={lowerCaseInput}
            label={input}
            htmlFor={lowerCaseInput}
            required
            maxLength={100}
            id={lowerCaseInput}
            name={lowerCaseInput}
            type={lowerCaseInput}
          />
        );
      })}
      <SubmitButton isPending={isPending} />
      {logInError && (
        <p className="text-red-500 text-sm mt-2">{logInError.message}</p>
      )}
      <Link href="/app/contact?request-demo-account=true" className='border rounded-md w-full flex justify-center py-2.5 mt-10 hover:text-white hover:border-white'>
        Request a demo account
      </Link>
    </form>
  );
};

export default AuthForm;
