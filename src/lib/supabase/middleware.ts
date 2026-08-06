import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Rotas públicas de autenticação: quem já está logado não precisa vê-las.
const AUTH_ROUTES = ["/auth/login", "/auth/register", "/auth/forgot-password"];

// Rotas que exigem um usuário cadastrado e logado.
const PROTECTED_ROUTES = ["/account"];

function requiresLogin(pathname: string) {
  if (PROTECTED_ROUTES.some((route) => pathname.startsWith(route))) {
    return true;
  }
  // Assistir a um curso exige cadastro; o catálogo /courses é público.
  return pathname.startsWith("/courses/");
}

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname, search } = request.nextUrl;

  // Painel administrativo
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login") && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.search = "";
    return NextResponse.redirect(url);
  }

  // Área do aluno e páginas de curso
  if (requiresLogin(pathname) && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    url.search = "";
    url.searchParams.set("redirectTo", `${pathname}${search}`);
    return NextResponse.redirect(url);
  }

  // Já logado não precisa de login/cadastro
  if (user && AUTH_ROUTES.some((route) => pathname.startsWith(route))) {
    const url = request.nextUrl.clone();
    url.pathname = "/courses";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
