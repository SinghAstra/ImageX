import { getCurrentUser } from "@/actions/auth";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      Home
    </div>
  );
}
