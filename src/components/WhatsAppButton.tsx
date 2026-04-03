import { MessageCircle } from "lucide-react";

import { WHATSAPP_URL } from "@/lib/whatsapp";

const WhatsAppButton = () => {
  const whatsappUrl = WHATSAPP_URL;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#20BD5A] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group cursor-pointer"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-white fill-white" />
      <span className="absolute right-full mr-3 px-3 py-2 bg-card border border-border rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md pointer-events-none">
        Chat with us
      </span>
    </a>
  );
};

export default WhatsAppButton;
