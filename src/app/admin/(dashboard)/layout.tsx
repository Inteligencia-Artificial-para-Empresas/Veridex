import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import "@/app/globals.css";

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();

  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  // 2. Verificamos el rol en la tabla de perfiles
  const { data: profile } = await supabase.from("users").select("role").eq("id", user.id).single();

  if (!profile || profile.role !== "admin") {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-[#050505]">
      <main className="flex-1 relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-veridex/5 blur-[120px] rounded-full -z-10 pointer-events-none" />
        <div className="py-5 px-0 md:p-12 max-w-7xl mx-auto flex flex-col items-center w-full">{children}</div>
      </main>
    </div>
  );
}
