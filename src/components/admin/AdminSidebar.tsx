"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import { 
  Newspaper, 
  FolderKanban, 
  Users, 
  LayoutDashboard,
  LogOut,
  Image as ImageIcon
} from "lucide-react";

const menuItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/news", label: "Notícias", icon: Newspaper },
  { href: "/admin/projects", label: "Projetos", icon: FolderKanban },
  { href: "/admin/galery", label: "Galeria", icon: ImageIcon },
  { href: "/admin/team", label: "Equipe", icon: Users },
];

export default function AdminSidebar({ adminName }: { adminName: string }) {
  const pathname = usePathname();
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-slate-800 border-r border-slate-700 flex flex-col">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-xl font-bold text-white">CRC Admin</h1>
        <p className="text-sm text-slate-400 mt-1 truncate">{adminName}</p>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== "/admin" && pathname.startsWith(item.href));
            const Icon = item.icon;
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-slate-300 hover:bg-slate-700 hover:text-white"
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-700">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full text-slate-300 hover:bg-slate-700 hover:text-white rounded-lg transition-colors"
        >
          <LogOut size={20} />
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
}
