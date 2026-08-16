import { verifyAuth } from "./actions";
import AdminLogin from "@/components/AdminLogin";
import AdminDashboard from "@/components/AdminDashboard";
import { supabase } from "@/lib/supabase";

export const revalidate = 0;

export default async function AdminPage() {
  const isAuth = await verifyAuth();

  if (!isAuth) {
    return (
      <main className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <AdminLogin />
      </main>
    );
  }

  // Fetch all data for the dashboard
  const { data: grades } = await supabase.from("grades").select("*").order("id");
  const { data: units } = await supabase.from("units").select("*").order("id");
  const { data: lessons } = await supabase.from("lessons").select("*").order("id");
  const { data: words } = await supabase.from("words").select("*").order("id", { ascending: false });
  
  // Settings
  const { data: settings } = await supabase.from("settings").select("*");
  const settingsMap = settings?.reduce((acc: any, s: any) => { acc[s.key] = s.value; return acc; }, {});

  return (
    <main className="container">
      <AdminDashboard grades={grades || []} units={units || []} lessons={lessons || []} words={words || []} settings={settingsMap || {}} />
    </main>
  );
}
