"use client";

import Link from "next/link";
import { useActionState } from "react";

import { logIn } from "@/actions/index";

import InputLogin from "./input-login";
import { SubmitButton } from "./submit-button";

const AuthForm = () => {
  const [logInState, dispatchLogIn, isPending] = useActionState(logIn, undefined);

  return (
    <form
      action={dispatchLogIn}
      className="flex flex-col gap-y-4 md:gap-y-2 max-md:w-full w-80 max-md:px-4"
    >
      <InputLogin
        label="Email"
        htmlFor="email"
        required
        maxLength={100}
        id="email"
        name="email"
        type="email"
        defaultValue={logInState?.email ?? ""}
      />
      <InputLogin
        label="Password"
        htmlFor="password"
        required
        maxLength={100}
        id="password"
        name="password"
        type="password"
      />
      <SubmitButton isPending={isPending} />
      {logInState?.message && (
        <p className="text-red-500 text-sm mt-2">{logInState.message}</p>
      )}
      <Link href="/contact?request-demo-account=true" className='border rounded-md w-full flex justify-center py-2.5 mt-10 hover:text-white hover:border-white'>
        Request a demo account
      </Link>
    </form>
  );
};

export default AuthForm;
