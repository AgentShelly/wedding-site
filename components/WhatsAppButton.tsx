import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") ?? "15005550006";
  const message = encodeURIComponent(
    "Hi! I'm interested in booking a vacation rental in Playa del Carmen. Can you help me?"
  );
  const href = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl bg-[#25D366] text-white shadow-lg hover:bg-[#1ebe57] transition-all hover:scale-105 focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 group"
    >
      <MessageCircle className="w-5 h-5 flex-shrink-0" />
      <span className="text-sm font-semibold hidden sm:block">WhatsApp us</span>
    </a>
  );
}
