import { getFolders } from "@/actions/folder";
import { FolderContent } from "@/components/dashboard/folder-content";

export default async function DashboardPage() {
  const folders = await getFolders(null);

  return <FolderContent folders={folders || []} currentFolderId={null} />;
}
