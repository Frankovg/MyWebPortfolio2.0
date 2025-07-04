"use client";

import React, { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { logIn } from "@/actions/index";
import ButtonWhite from "@/components/primitives/button-white";

import InputLogin from "./input-login";

const AuthForm = () => {
  const [logInError, dispatchLogIn] = useActionState(logIn, undefined);

  const { pending } = useFormStatus();

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

      <ButtonWhite
        loading={pending}
        disabled={pending}
        text="Log in"
        className="mt-4 md:w-full"
        type="submit"
      />

      {logInError && (
        <p className="text-red-500 text-sm mt-2">{logInError.message}</p>
      )}
    </form>
  );
};

export default AuthForm;
