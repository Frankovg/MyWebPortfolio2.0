"use client";

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
    </form>
  );
};

export default AuthForm;
