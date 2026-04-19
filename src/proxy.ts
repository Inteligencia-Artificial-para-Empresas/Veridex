import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";

const locales = ["en", "es"];

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({
    request: { headers: request.headers },
  });

  // 2. Cliente de Supabase para el Middleware
  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  // IMPORTANTE: getUser() refresca la sesión y la cookie
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 3. Lógica de Idiomas (Solo fuera de admin)
  if (!request.nextUrl.pathname.startsWith("/admin")) {
    const handleI18nRouting = createIntlMiddleware({
      locales: ["en", "es"],
      defaultLocale: "es",
      localePrefix: "always",
    });
    return handleI18nRouting(request);
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
