import { getCurrentUser } from "@/actions/auth";
import { getFolders } from "@/actions/folder";
import { redirect } from "next/navigation";
import { DashboardContent } from "./dashboard-content";

export default async function DashboardRootPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/login");
  }
  const folders = await getFolders(null);

  return (
    <DashboardContent
      currentUser={currentUser}
      folders={folders || []}
      currentFolderId={null}
    />
  );
}
