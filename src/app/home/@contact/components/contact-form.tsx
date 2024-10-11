'use client'

//Components
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

//Utils
import { useForm } from 'react-hook-form'

//Zod
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, TContactForm } from "@/lib/validations"
import { sendMail } from "@/actions/actions"
import { toast } from "sonner"



function ContactForm() {
  const {
    register,
    formState: { errors, isSubmitting },
    trigger,
    getValues,
  } = useForm<TContactForm>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: undefined,
  })

  // const onSubmit = async (values: z.infer<typeof contactFormSchema>) => {
  //   const mailText = `Name: ${values.first_name} ${values.last_name}\n  Email: ${values.email}\nMessage: ${values.message}`
  //   const response = await sendMail({
  //     email: values.email,
  //     subject: 'New Contact Us Form',
  //     text: mailText,
  //   })
  //   if (response?.messageId) {
  //     toast.success('Application Submitted Successfully.');
  //   } else {
  //     toast.error('Failed To send application.');
  //   }
  // };

  return (
    <div className="w-full pb-24">
      <form
        className="max-w-[645px] mx-auto"
        action={async () => {
          const result = await trigger()
          if (!result) return

          const messageData = getValues()
          const mailText = `Name: ${messageData.first_name} ${messageData.last_name}\n  Email: ${messageData.email}\n Message: ${messageData.message}`
          const response = await sendMail({
            email: messageData.email,
            subject: `Mensaje de ${messageData.email}`,
            text: mailText,
          })
          if (response?.messageId) {
            toast.success('Application submitted successfully')
          } else {
            toast.error('Failed to send application', {
              richColors: true
            })
          }
        }}
      >
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className='space-y-1 w-full'>
              <Label htmlFor="first_name">*First name</Label>
              <Input
                className="bg-transparent"
                id="first_name"
                placeholder="John"
                // maxLength={100}
                {...register('first_name')}
              />
              {
                errors.first_name &&
                <span className='text-red-500'>{errors.first_name.message}</span>
              }
            </div>
            <div className='space-y-1 w-full'>
              <Label htmlFor="last_name">*Last name</Label>
              <Input
                className="bg-transparent"
                id="last_name"
                placeholder="Doe"
                // maxLength={100}
                {...register('last_name')}
              />
              {
                errors.last_name &&
                <span className='text-red-500'>{errors.last_name.message}</span>
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
                placeholder="123 456 7890"
                // maxLength={100}
                {...register('phone')}
              />
              {
                errors.phone &&
                <span className='text-red-500'>{errors.phone.message}</span>
              }
            </div>
            <div className='space-y-1 w-full'>
              <Label htmlFor="email">*Email</Label>
              <Input
                className="bg-transparent"
                type="email"
                id="email"
                placeholder="john.doe@email.com"
                // required
                // maxLength={100}
                {...register('email')}
              />
              {
                errors.email &&
                <span className='text-red-500'>{errors.email.message}</span>
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
              <span className='text-red-500'>{errors.message.message}</span>
            }
          </div>

          <Button
            className="group relative bg-white text-lg font-semibold py-[18px] px-[34px] overflow-hidden w-full md:w-fit"
            disabled={isSubmitting}
          >
            <span className="absolute inset-0 bg-primary transform w-0 transition-all duration-300 ease-in-out group-hover:w-full" />
            <span className="relative z-10 text-darkGrey">{isSubmitting ? 'Sending...' : 'Send'}</span>
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ContactForm;