'use client'

import React from 'react'

//Actions
import { logIn } from '@/actions/actions'

//Hooks
import { useFormState, useFormStatus } from 'react-dom'

//Components
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

const AuthForm = () => {
  const [logInError, dispatchLogIn] = useFormState(logIn, undefined)

  const { pending } = useFormStatus()

  return (
    <form action={dispatchLogIn} >
      <div className='space-y-1'>
        <Label htmlFor='email'>Email</Label>
        <Input
          required
          maxLength={100}
          id='email'
          name='email'
          type='email'
        />
      </div>

      <div className='mb-4 mt-2 space-y-1'>
        <Label htmlFor='password'>Password</Label>
        <Input
          required
          maxLength={100}
          id='password'
          name='password'
          type='password'
        />
      </div>

      <Button disabled={pending} >
        Log In
      </Button>

      {logInError && <p className='text-red-500 text-sm mt-2'>{logInError.message}</p>}
    </form>
  )
}

export default AuthForm
