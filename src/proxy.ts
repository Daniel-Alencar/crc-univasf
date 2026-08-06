import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

/**
 * Convenção "proxy" do Next 16 (substitui o antigo "middleware").
 * Mantém o cookie de sessão do Supabase atualizado e protege as rotas
 * que exigem login.
 */
export default async function proxy(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Executa em todas as rotas, exceto arquivos estáticos e imagens.
     * Necessário para manter o cookie de sessão do Supabase atualizado.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
