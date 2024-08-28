import { authenticate } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AppHome() {
  const user = await authenticate()

  if (!user)
    return redirect("/auth")

  return (
    <main>Authorized! Hello, {user.email}!</main>
  );
}
