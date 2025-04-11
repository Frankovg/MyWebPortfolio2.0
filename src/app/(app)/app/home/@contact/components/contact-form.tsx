"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { sendMail } from "@/actions/actions";
import ButtonWhite from "@/components/primitives/button-white";
import RequiredInputLabel from "@/components/primitives/required-input-label";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contactFormSchema, TContactForm } from "@/lib/validations";

function ContactForm() {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    trigger,
    getValues,
    formState: { errors },
    reset,
  } = useForm<TContactForm>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: undefined,
  });

  const handleAction = async () => {
    startTransition(async () => {
      const result = await trigger();
      if (!result) return;

      const messageData = getValues();
      const mailText = `Name: ${messageData.first_name} ${messageData.last_name}\n  Email: ${messageData.email}\n Message: ${messageData.message}`;
      const mail = {
        email: messageData.email,
        subject: `Mensaje de ${messageData.email}`,
        text: mailText,
      };
      const response = await sendMail(mail);

      if (response?.messageId) {
        reset();
        toast.success("Application submitted successfully");
      } else {
        toast.error("Failed to send application");
        console.error("Failed to send application");
      }
    });
  };

  return (
    <div className="w-full pb-24">
      <form className="max-w-contact mx-auto" action={handleAction}>
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="space-y-1 w-full">
              <RequiredInputLabel htmlFor="first_name" label="First name" />
              <Input
                className="bg-transparent"
                id="first_name"
                placeholder="John"
                {...register("first_name")}
              />
              {errors.first_name && (
                <span className="text-error">{errors.first_name.message}</span>
              )}
            </div>
            <div className="space-y-1 w-full">
              <RequiredInputLabel htmlFor="last_name" label="Last name" />
              <Input
                className="bg-transparent"
                id="last_name"
                placeholder="Doe"
                {...register("last_name")}
              />
              {errors.last_name && (
                <span className="text-error">{errors.last_name.message}</span>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            <div className="space-y-1 w-full">
              <Label htmlFor="phone">Phone number</Label>
              <Input
                className="bg-transparent"
                type="tel"
                id="phone"
                placeholder="+34 608 222 555"
                {...register("phone")}
              />
              {errors.phone && (
                <span className="text-error">{errors.phone.message}</span>
              )}
            </div>
            <div className="space-y-1 w-full">
              <RequiredInputLabel htmlFor="email" label="Email" />
              <Input
                className="bg-transparent"
                type="email"
                id="email"
                placeholder="john.doe@email.com"
                {...register("email")}
              />
              {errors.email && (
                <span className="text-error">{errors.email.message}</span>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <RequiredInputLabel htmlFor="message" label="Message" />
            <Textarea
              className="bg-transparent min-h-36"
              id="message"
              placeholder="Type your message here."
              {...register("message")}
            />
            <p className="text-sm text-muted-foreground">
              También puedes escribirme en español.
            </p>
            {errors.message && (
              <span className="text-error">{errors.message.message}</span>
            )}
          </div>

          <ButtonWhite
            disabled={isPending}
            text={isPending ? "Sending..." : "Send"}
          />
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
