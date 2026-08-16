"use server";

import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";
import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || "fallback_secret_for_development_only");

export async function login(password: string) {
  const { data: settings } = await supabase.from("settings").select("value").eq("key", "admin_password").single();
  
  if (!settings) return { success: false, error: "Admin not configured" };

  const isValid = await bcrypt.compare(password, settings.value);
  
  if (isValid) {
    const token = await new SignJWT({ admin: true })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("24h")
      .sign(SECRET_KEY);
      
    const cookieStore = await cookies();
    cookieStore.set("admin_token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });
    
    return { success: true };
  }
  
  return { success: false, error: "Invalid password" };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_token");
}

export async function verifyAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  
  if (!token) return false;
  
  try {
    await jwtVerify(token, SECRET_KEY);
    return true;
  } catch (err) {
    return false;
  }
}

// CRUD Actions for Grades
export async function addGrade(slug: string, title: string) {
  await supabase.from("grades").insert({ slug, title });
}
export async function deleteGrade(id: number) {
  await supabase.from("grades").delete().eq("id", id);
}

// CRUD Actions for Units
export async function addUnit(grade_id: number, title: string) {
  await supabase.from("units").insert({ grade_id, title });
}
export async function deleteUnit(id: number) {
  await supabase.from("units").delete().eq("id", id);
}

// CRUD Actions for Lessons
export async function addLesson(unit_id: number, title: string) {
  await supabase.from("lessons").insert({ unit_id, title });
}
export async function deleteLesson(id: number) {
  await supabase.from("lessons").delete().eq("id", id);
}

// CRUD Actions for Words
export async function addWord(lesson_id: number, en_word: string, ar_word: string) {
  await supabase.from("words").insert({ lesson_id, en_word, ar_word });
}
export async function deleteWord(id: number) {
  await supabase.from("words").delete().eq("id", id);
}

// Update Settings
export async function updateSetting(key: string, value: string) {
  const { data } = await supabase.from("settings").select("id").eq("key", key).single();
  if (data) {
    await supabase.from("settings").update({ value }).eq("key", key);
  } else {
    await supabase.from("settings").insert({ key, value });
  }
}

// Change Password
export async function changePassword(newPassword: string) {
  const hash = await bcrypt.hash(newPassword, 10);
  await updateSetting("admin_password", hash);
}
