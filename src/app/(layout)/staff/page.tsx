import React from 'react';
import AosWrapper from "@/components/AosWrapper";
import StaffClient from "./StaffClient";
import { createClient } from "@/lib/supabase/server";

export default async function StaffPage() {
    const supabase = await createClient();

    // Buscar membros da equipe ativos ordenados pela ordem de exibição
    const { data: members } = await supabase
        .from("team_members")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });

    // Transformar registros do banco para o formato esperado pelo componente cliente
    const teamMembers = members?.map(m => ({
        name: m.name,
        // Mapeando 'role' para 'category' para manter compatibilidade com o UI
        category: m.role,
        imageUrl: m.image_url || "/placeholder.svg",
        linkedinUrl: m.linkedin_url,
        lattesUrl: m.lattes_url,
        description: m.description || "",
        email: m.email
    })) || [];

    return (
        <AosWrapper>
            <StaffClient initialMembers={teamMembers} />
        </AosWrapper>
    );
}
