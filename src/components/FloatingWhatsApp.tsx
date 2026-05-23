import { MessageCircle } from "lucide-react";

export function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/2349127050547"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3.5 text-sm font-semibold text-white shadow-2xl shadow-[#25D366]/30 ring-1 ring-white/20 transition-transform hover:scale-105"
    >
      <span className="relative flex h-5 w-5 items-center justify-center">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/40" />
        <MessageCircle className="relative h-5 w-5" />
      </span>
      <span className="hidden sm:inline">Chat on WhatsApp</span>
    </a>
  );
}
