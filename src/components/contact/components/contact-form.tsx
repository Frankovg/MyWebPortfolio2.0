'use client'

import { useTransition } from "react"

//Components
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast, Toaster } from "sonner"
import ButtonWhite from "@/components/button-white"

//Utils
import { useForm } from 'react-hook-form'

//Zod
import { zodResolver } from '@hookform/resolvers/zod';

//Validations
import { contactFormSchema, TContactForm } from "@/lib/validations"

//Actions
import { sendMail } from "@/actions/actions"

function ContactForm() {
  const [isPending, startTransition] = useTransition()

  const {
    register,
    trigger,
    getValues,
    formState: { errors },
    reset,
  } = useForm<TContactForm>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: undefined,
  })

  const handleAction = async () => {
    startTransition(async () => {
      const result = await trigger()
      if (!result) return

      const messageData = getValues()
      const mailText = `Name: ${messageData.first_name} ${messageData.last_name}\n  Email: ${messageData.email}\n Message: ${messageData.message}`
      const mail = {
        email: messageData.email,
        subject: `Mensaje de ${messageData.email}`,
        text: mailText,
      }
      const response = await sendMail(mail)

      if (response?.messageId) {
        reset()
        toast.success('Application submitted successfully')
      } else {
        toast.error('Failed to send application', {
          richColors: true
        })
      }
    })
  }

  return (
    <div className="w-full pb-24">
      <Toaster
        toastOptions={{
          classNames: {
            toast: 'bg-background',
            title: 'text-whiteText',
            success: 'text-success',
            error: 'text-error',
          }
        }}
      />
      <form
        className="max-w-[645px] mx-auto"
        action={handleAction}
      >
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className='space-y-1 w-full'>
              <Label htmlFor="first_name">*First name</Label>
              <Input
                className="bg-transparent"
                id="first_name"
                placeholder="John"
                {...register('first_name')}
              />
              {
                errors.first_name &&
                <span className='text-error'>{errors.first_name.message}</span>
              }
            </div>
            <div className='space-y-1 w-full'>
              <Label htmlFor="last_name">*Last name</Label>
              <Input
                className="bg-transparent"
                id="last_name"
                placeholder="Doe"
                {...register('last_name')}
              />
              {
                errors.last_name &&
                <span className='text-error'>{errors.last_name.message}</span>
              }
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            <div className='space-y-1 w-full'>
              <Label htmlFor="phone">Phone number</Label>
              <Input
                className="bg-transparent"
                type="tel"
                id="phone"
                placeholder="+34 608 222 555"
                {...register('phone')}
              />
              {
                errors.phone &&
                <span className='text-error'>{errors.phone.message}</span>
              }
            </div>
            <div className='space-y-1 w-full'>
              <Label htmlFor="email">*Email</Label>
              <Input
                className="bg-transparent"
                type="email"
                id="email"
                placeholder="john.doe@email.com"
                {...register('email')}
              />
              {
                errors.email &&
                <span className='text-error'>{errors.email.message}</span>
              }
            </div>
          </div>

          <div className='space-y-1'>
            <Label htmlFor="message">*Message</Label>
            <Textarea
              className="bg-transparent min-h-36"
              id="message"
              placeholder="Type your message here."
              {...register('message')}
            />
            <p className="text-sm text-muted-foreground">
              También puedes escribirme en español.
            </p>
            {
              errors.message &&
              <span className='text-error'>{errors.message.message}</span>
            }
          </div>

          <ButtonWhite
            disabled={isPending}
            text={isPending ? 'Sending...' : 'Send'}
          />
        </div>
      </form>
    </div>
  )
}

export default ContactForm;