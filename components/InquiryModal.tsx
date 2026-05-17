"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import * as Dialog from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { X, Loader2, CheckCircle, AlertCircle } from "lucide-react";

const schema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  checkIn: z.string().optional(),
  checkOut: z.string().optional(),
  guests: z.coerce.number().int().min(1).max(20).optional(),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
});

type FormData = z.infer<typeof schema>;

interface InquiryModalProps {
  trigger: React.ReactNode;
  propertySlug?: string;
  propertyName?: string;
}

export default function InquiryModal({
  trigger,
  propertySlug,
  propertyName,
}: InquiryModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          propertySlug,
          propertyName,
          // TODO: Integrate Cloudflare Turnstile token
          turnstileToken: "1x00000000000000000000AA", // Test token
          locale: "en",
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error ?? "Failed to send inquiry");
      }

      setStatus("success");
      reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setStatus("idle");
      setErrorMessage("");
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleOpenChange}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink-900/50 backdrop-blur-sm animate-fade-in" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white shadow-2xl max-h-[90vh] overflow-y-auto animate-fade-in"
          aria-describedby="inquiry-description"
        >
          <VisuallyHidden.Root>
            <Dialog.Description id="inquiry-description">
              Send an inquiry to Tranquilo Vacation Rentals
            </Dialog.Description>
          </VisuallyHidden.Root>

          <div className="flex items-center justify-between p-6 border-b border-line">
            <Dialog.Title className="font-display text-xl text-ink-900 font-semibold">
              {propertyName ? `Inquire about ${propertyName}` : "Send an Inquiry"}
            </Dialog.Title>
            <Dialog.Close className="p-2 rounded-lg text-ink-300 hover:text-ink-600 hover:bg-limestone-100 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500">
              <X className="w-5 h-5" />
              <span className="sr-only">Close</span>
            </Dialog.Close>
          </div>

          <div className="p-6">
            {status === "success" ? (
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
                <h3 className="font-display text-xl text-ink-900 font-semibold mb-2">
                  Inquiry sent!
                </h3>
                <p className="text-ink-600 mb-6">
                  We&apos;ll get back to you within 24 hours. Check your inbox for a
                  confirmation email.
                </p>
                <button
                  onClick={() => handleOpenChange(false)}
                  className="px-6 py-2 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-700 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="inquiry-name"
                      className="block text-sm font-medium text-ink-900 mb-1"
                    >
                      Name <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id="inquiry-name"
                      type="text"
                      autoComplete="name"
                      {...register("name")}
                      aria-invalid={errors.name ? "true" : "false"}
                      aria-describedby={errors.name ? "inquiry-name-error" : undefined}
                      className="w-full px-3 py-2.5 rounded-xl border border-line text-ink-900 placeholder:text-ink-300 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:border-emerald-500 outline-none transition-colors text-sm"
                      placeholder="Your name"
                    />
                    {errors.name && (
                      <p id="inquiry-name-error" className="text-red-600 text-xs mt-1" role="alert">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="inquiry-email"
                      className="block text-sm font-medium text-ink-900 mb-1"
                    >
                      Email <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id="inquiry-email"
                      type="email"
                      autoComplete="email"
                      {...register("email")}
                      aria-invalid={errors.email ? "true" : "false"}
                      aria-describedby={errors.email ? "inquiry-email-error" : undefined}
                      className="w-full px-3 py-2.5 rounded-xl border border-line text-ink-900 placeholder:text-ink-300 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:border-emerald-500 outline-none transition-colors text-sm"
                      placeholder="you@example.com"
                    />
                    {errors.email && (
                      <p id="inquiry-email-error" className="text-red-600 text-xs mt-1" role="alert">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="inquiry-phone"
                    className="block text-sm font-medium text-ink-900 mb-1"
                  >
                    Phone (optional)
                  </label>
                  <input
                    id="inquiry-phone"
                    type="tel"
                    autoComplete="tel"
                    {...register("phone")}
                    className="w-full px-3 py-2.5 rounded-xl border border-line text-ink-900 placeholder:text-ink-300 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:border-emerald-500 outline-none transition-colors text-sm"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label
                      htmlFor="inquiry-checkin"
                      className="block text-sm font-medium text-ink-900 mb-1"
                    >
                      Check-in
                    </label>
                    <input
                      id="inquiry-checkin"
                      type="date"
                      {...register("checkIn")}
                      className="w-full px-3 py-2.5 rounded-xl border border-line text-ink-900 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:border-emerald-500 outline-none transition-colors text-sm"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="inquiry-checkout"
                      className="block text-sm font-medium text-ink-900 mb-1"
                    >
                      Check-out
                    </label>
                    <input
                      id="inquiry-checkout"
                      type="date"
                      {...register("checkOut")}
                      className="w-full px-3 py-2.5 rounded-xl border border-line text-ink-900 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:border-emerald-500 outline-none transition-colors text-sm"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="inquiry-guests"
                      className="block text-sm font-medium text-ink-900 mb-1"
                    >
                      Guests
                    </label>
                    <input
                      id="inquiry-guests"
                      type="number"
                      min={1}
                      max={20}
                      {...register("guests")}
                      className="w-full px-3 py-2.5 rounded-xl border border-line text-ink-900 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:border-emerald-500 outline-none transition-colors text-sm"
                      placeholder="2"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="inquiry-message"
                    className="block text-sm font-medium text-ink-900 mb-1"
                  >
                    Message <span aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="inquiry-message"
                    rows={4}
                    {...register("message")}
                    aria-invalid={errors.message ? "true" : "false"}
                    aria-describedby={errors.message ? "inquiry-message-error" : undefined}
                    className="w-full px-3 py-2.5 rounded-xl border border-line text-ink-900 placeholder:text-ink-300 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:border-emerald-500 outline-none transition-colors text-sm resize-none"
                    placeholder={
                      propertyName
                        ? `I'm interested in ${propertyName} and would like to know...`
                        : "Tell us what you're looking for..."
                    }
                  />
                  {errors.message && (
                    <p id="inquiry-message-error" className="text-red-600 text-xs mt-1" role="alert">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* TODO: Add Cloudflare Turnstile widget here */}
                {/* <div className="turnstile-container" data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY} /> */}

                {status === "error" && (
                  <div
                    role="alert"
                    className="flex items-start gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm"
                  >
                    <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Inquiry"
                  )}
                </button>

                <p className="text-xs text-ink-300 text-center">
                  We typically respond within 24 hours. You can also reach us on{" "}
                  <a
                    href={`https://wa.me/${(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "+15005550006").replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-500 hover:underline"
                  >
                    WhatsApp
                  </a>
                  .
                </p>
              </form>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
