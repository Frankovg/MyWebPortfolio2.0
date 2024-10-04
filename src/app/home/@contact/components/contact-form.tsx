'use client'

import { Button } from "@/components/ui/button";
//Components
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

//Utils
import { useForm } from 'react-hook-form'

function ContactForm() {
  const {
    register,
    formState: { errors },
  } = useForm()

  return (
    <div className="w-full pb-24">
      <form
        action=""
        className="max-w-[50%] mx-auto"
      >
        <div className="space-y-4">
          <div className="flex gap-3">
            <div className='space-y-1 w-full'>
              <Label htmlFor="first_name">*First name</Label>
              <Input
                className="bg-transparent"
                id="first_name"
                placeholder="John"
                maxLength={100}
                {...register('first_name')}
              />
              {
                errors.name &&
                <span className='text-red-500'>
                  {/* {errors.first_name.message} */}
                </span>
              }
            </div>
            <div className='space-y-1 w-full'>
              <Label htmlFor="last_name">*Last name</Label>
              <Input
                className="bg-transparent"
                id="last_name"
                placeholder="Doe"
                maxLength={100}
                {...register('last_name')}
              />
              {
                errors.name &&
                <span className='text-red-500'>
                  {/* {errors.last_name.message} */}
                </span>
              }
            </div>
          </div>

          <div className="flex gap-3">
            <div className='space-y-1 w-full'>
              <Label htmlFor="phone">Phone number</Label>
              <Input
                className="bg-transparent"
                type="tel"
                id="phone"
                placeholder="123 456 7890"
                maxLength={100}
                {...register('phone')}
              />
              {
                errors.name &&
                <span className='text-red-500'>
                  {/* {errors.phone.message} */}
                </span>
              }
            </div>
            <div className='space-y-1 w-full'>
              <Label htmlFor="email">*Email</Label>
              <Input
                className="bg-transparent"
                type="email"
                id="email"
                placeholder="john.doe@email.com"
                required
                maxLength={100}
                {...register('email')}
              />
              {
                errors.name &&
                <span className='text-red-500'>
                  {/* {errors.email.message} */}
                </span>
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
              errors.notes &&
              <span className='text-red-500'>
                {/* {errors.message.message} */}
              </span>
            }
          </div>

          <Button
            className="group relative bg-white text-lg font-semibold py-[18px] px-[34px] overflow-hidden"
          >
            <span className="absolute inset-0 bg-primary transform w-0 transition-all duration-300 ease-in-out group-hover:w-full" />
            <span className="relative z-10 text-darkGrey">Send</span>
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ContactForm;