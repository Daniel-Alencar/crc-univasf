import React from "react"
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect("/admin/login");
  }

  // Check if user is admin
  const { data: adminData } = await supabase
    .from("admins")
    .select("id, name")
    .eq("user_id", user.id)
    .single();

  if (!adminData) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-slate-900 flex">
      <AdminSidebar adminName={adminData.name || user.email || "Admin"} />
      <main className="flex-1 p-8 ml-64">
        {children}
      </main>
    </div>
  );
}
