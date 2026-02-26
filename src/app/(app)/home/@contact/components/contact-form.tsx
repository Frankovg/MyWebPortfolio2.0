"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Turnstile } from "@marsidev/react-turnstile";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { submitContactForm } from "@/actions/index";
import ButtonWhite from "@/components/primitives/button-white";
import FormFieldError from "@/components/primitives/form-field-error";
import RequiredInputLabel from "@/components/primitives/required-input-label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ACCOUNT_REQUEST_MESSAGE } from "@/lib/constants";
import { contactFormSchema, TContactForm } from "@/lib/validations";

import { RequestMessage } from "./request-message";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const honeypotRef = useRef<HTMLInputElement>(null);

  const isAnAccountRequest = searchParams.get('request-demo-account')

  const {
    register,
    trigger,
    getValues,
    formState: { errors },
    reset,
    control,
  } = useForm<TContactForm>({
    resolver: zodResolver(contactFormSchema),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = await trigger();
    if (!isValid) return;

    startTransition(async () => {
      const messageData = getValues();
      const mailText = `Name: ${messageData.first_name} ${messageData.last_name}\n  Email: ${messageData.email}\n Message: ${messageData.message}`;

      const response = await submitContactForm({
        email: messageData.email,
        subject: isAnAccountRequest ? `Solicitud de ${messageData.email}` : `Mensaje de ${messageData.email}`,
        text: mailText,
        honeypot: honeypotRef.current?.value || "",
        turnstileToken: turnstileToken || "",
      });

      if (response?.messageId) {
        reset();
        toast.success("Message submitted successfully");
      } else if (response?.error === "turnstile_failed") {
        toast.error("Verification failed. Please try again.");
      } else {
        toast.error("Failed to send application");
        if (process.env.NODE_ENV === "development") {
          console.error("Failed to send application");
        }
      }
    });
  };

  return (
    <div className="w-full pb-24">
      {isAnAccountRequest && <RequestMessage />}

      <form className="max-w-contact mx-auto" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="absolute -left-2499.75 h-0 w-0 overflow-hidden" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input
              ref={honeypotRef}
              type="text"
              id="website"
              name="website"
              autoComplete="off"
              tabIndex={-1}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            <div className="space-y-1 w-full">
              <RequiredInputLabel htmlFor="first_name" label="First name" />
              <Input
                className="bg-transparent"
                id="first_name"
                placeholder="John"
                aria-invalid={!!errors.first_name}
                aria-describedby={errors.first_name ? "first_name-error" : undefined}
                {...register("first_name")}
              />
              <FormFieldError id="first_name-error" message={errors.first_name?.message} />
            </div>
            <div className="space-y-1 w-full">
              <RequiredInputLabel htmlFor="last_name" label="Last name" />
              <Input
                className="bg-transparent"
                id="last_name"
                placeholder="Doe"
                aria-invalid={!!errors.last_name}
                aria-describedby={errors.last_name ? "last_name-error" : undefined}
                {...register("last_name")}
              />
              <FormFieldError id="last_name-error" message={errors.last_name?.message} />
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
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "phone-error" : undefined}
                {...register("phone")}
              />
              <FormFieldError id="phone-error" message={errors.phone?.message} />
            </div>
            <div className="space-y-1 w-full">
              <RequiredInputLabel htmlFor="email" label="Email" />
              <Input
                className="bg-transparent"
                type="email"
                id="email"
                placeholder="john.doe@email.com"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                {...register("email")}
              />
              <FormFieldError id="email-error" message={errors.email?.message} />
            </div>
          </div>

          <div className="space-y-1">
            <RequiredInputLabel htmlFor="message" label="Message" />
            <Textarea
              className="bg-transparent min-h-36"
              id="message"
              placeholder="Type your message here."
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
              {...register("message")}
              defaultValue={isAnAccountRequest ? ACCOUNT_REQUEST_MESSAGE : ""}
            />
            <p className="text-sm text-muted-foreground">
              También puedes escribirme en español.
            </p>
            <FormFieldError id="message-error" message={errors.message?.message} />
          </div>

          <div className="py-2">
            <Controller
              name="privacy_policy"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <div className="flex gap-2 items-center">
                  <Checkbox
                    id="privacy_policy"
                    defaultChecked={true}
                    checked={field.value}
                    {...register("privacy_policy")}
                    onCheckedChange={field.onChange}
                  />
                  <Label htmlFor="privacy_policy">I accept the <Link className="underline hover:text-white" href="/privacy-policy">Privacy Policy</Link>.</Label>
                </div>
              )}
            />
            <FormFieldError id="privacy_policy-error" message={errors.privacy_policy?.message} />
          </div>

          {TURNSTILE_SITE_KEY && (
            <Turnstile
              siteKey={TURNSTILE_SITE_KEY}
              onSuccess={setTurnstileToken}
              onExpire={() => setTurnstileToken(null)}
              options={{ theme: "dark", language: "en", size: "invisible" }}
            />
          )}

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
