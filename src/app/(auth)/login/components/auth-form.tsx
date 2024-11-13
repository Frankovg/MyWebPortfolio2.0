'use client'

import React from 'react'

//Actions
import { logIn } from '@/actions/actions'

//Hooks
import { useFormState, useFormStatus } from 'react-dom'

//Components
import ButtonWhite from '@/components/button-white'
import InputLogin from './input-login'

const AuthForm = () => {
  const [logInError, dispatchLogIn] = useFormState(logIn, undefined)

  const { pending } = useFormStatus()

  const inputs = ['Email', 'Password']

  return (
    <form
      action={dispatchLogIn}
      className='flex flex-col gap-y-4 md:gap-y-2 max-md:w-full max-md:px-4'
    >
      {inputs.map((input) => {
        const lowerCaseInput = input.toLowerCase()
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
        )
      })}

      <ButtonWhite
        disabled={pending}
        text='Log in'
        className='mt-4 md:w-full'
      />

      {logInError &&
        <p className='text-red-500 text-sm mt-2'>
          {logInError.message}
        </p>
      }
    </form>
  )
}

export default AuthForm
