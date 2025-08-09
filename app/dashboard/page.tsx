import { getCurrentUser } from "@/actions/auth";
import { getFolderPath, getFolders } from "@/actions/folder";
import { FolderContent } from "@/components/dashboard/folder-content";
import { Navbar } from "@/components/dashboard/navbar";
import { redirect } from "next/navigation";

const DashboardLayout = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/login");
  }

  const folders = await getFolders(null);

  return (
    <div className="min-h-screen flex flex-col gap-4 ">
      <Navbar currentUser={currentUser} currentFolderId={null} />
      <FolderContent folders={folders || []} currentFolderId={null} />
    </div>
  );
};

export default DashboardLayout;
