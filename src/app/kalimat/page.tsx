import { redirect } from "next/navigation";

export default function KalimatRootPage() {
  // If the user goes to /kalimat without a specific grade, redirect them to the home page to choose a grade
  redirect("/");
}
