export const CONTACT_INFO = {
  whatsappNumber: "5545999178290",
  whatsappFormatted: "(45) 99917-8290",
  email: "elessandro@epmdevtech.com.br",
  horarioAtendimento: "Segunda a Sexta, das 09h às 18h (BRT)",
} as const;

/**
 * Retorna o link completo para conversa no WhatsApp com texto opcional codificado
 */
export function getWhatsAppUrl(customMessage?: string): string {
  const base = `https://wa.me/${CONTACT_INFO.whatsappNumber}`;
  if (!customMessage || !customMessage.trim()) {
    return base;
  }
  return `${base}?text=${encodeURIComponent(customMessage.trim())}`;
}
