"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { sendMail } from "@/actions/index";
import ButtonWhite from "@/components/primitives/button-white";
import RequiredInputLabel from "@/components/primitives/required-input-label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ACCOUNT_REQUEST_MESSAGE } from "@/lib/constants";
import { contactFormSchema, TContactForm } from "@/lib/validations";


import { RequestMessage } from "./request-message";

function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();

  const isAnAccountRequest = searchParams.get('request-demo-account')

  const {
    register,
    trigger,
    getValues,
    formState: { errors },
    reset,
    control,
    setError
  } = useForm<TContactForm>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: undefined,
  });

  const handleAction = async () => {
    const privacyPolicy = getValues("privacy_policy")
    if (!privacyPolicy) {
      setError("privacy_policy", { message: "Please accept the Privacy Policy to submit the form." })
      return
    }

    startTransition(async () => {
      const result = await trigger();
      if (!result) return;

      const messageData = getValues();
      const mailText = `Name: ${messageData.first_name} ${messageData.last_name}\n  Email: ${messageData.email}\n Message: ${messageData.message}`;
      const mail = {
        email: messageData.email,
        subject: isAnAccountRequest ? `Solicitud de ${messageData.email}` : `Mensaje de ${messageData.email}`,
        text: mailText,
      };

      const response = await sendMail(mail);

      if (response?.messageId) {
        reset();
        toast.success("Message submitted successfully");
      } else {
        toast.error("Failed to send application");
        console.error("Failed to send application");
      }
    });
  };

  return (
    <div className="w-full pb-24">
      {isAnAccountRequest && <RequestMessage />}
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
              defaultValue={isAnAccountRequest ? ACCOUNT_REQUEST_MESSAGE : ""}
            />
            <p className="text-sm text-muted-foreground">
              También puedes escribirme en español.
            </p>
            {errors.message && (
              <span className="text-error">{errors.message.message}</span>
            )}
          </div>

          <div className="py-2">
            <Controller
              name="privacy_policy"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <div className="flex gap-2 items-center">
                  <Checkbox
                    defaultChecked={true}
                    checked={field.value}
                    {...register("privacy_policy")}
                    onCheckedChange={field.onChange}
                  />
                  <Label htmlFor="isActive">I accept the <Link className="underline hover:text-white" href="/privacy-policy">Privacy Policy</Link>.</Label>
                </div>
              )}
            />
            {errors.privacy_policy && (
              <span className="text-error">{errors.privacy_policy.message}</span>
            )}
          </div>

          <ButtonWhite
            disabled={isPending}
            text={isPending ? "Sending..." : "Send"}
            loading={isPending}
            type="submit"
          />
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
