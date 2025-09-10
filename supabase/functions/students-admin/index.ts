// deno-lint-ignore-file no-explicit-any
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !serviceKey) throw new Error("Missing Supabase env vars");

    const supabase = createClient(supabaseUrl, serviceKey);

    const body = await req.json().catch(() => ({}));
    const action = body?.action as string;

    if (action === "add") {
      const { student_id, email, full_name, phone, course, year_of_study } = body;
      if (!student_id || !email || !full_name) {
        return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      // Try insert, if conflict on unique, return existing
      const { data: inserted, error: insertError } = await supabase
        .from("students")
        .insert([{ student_id, email, full_name, phone, course, year_of_study }])
        .select("*")
        .single();

      if (insertError) {
        // If duplicate, fetch existing
        const { data: existing, error: fetchError } = await supabase
          .from("students")
          .select("*")
          .or(`student_id.eq.${student_id},email.eq.${email}`)
          .maybeSingle();
        if (existing) {
          return new Response(JSON.stringify({ data: existing, duplicate: true }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
        }
        return new Response(JSON.stringify({ error: insertError.message || fetchError?.message }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      return new Response(JSON.stringify({ data: inserted }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    if (action === "list") {
      const { from = 0, to = 9, search = "" } = body || {};
      let query = supabase.from("students").select("*", { count: "exact" }).order("created_at", { ascending: false }).range(from, to);
      if (search) {
        query = query.ilike("full_name", `%${search}%`);
      }
      const { data, error, count } = await query;
      if (error) throw error;
      return new Response(JSON.stringify({ data, count }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    return new Response(JSON.stringify({ error: "Invalid action" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || "Unknown error" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});