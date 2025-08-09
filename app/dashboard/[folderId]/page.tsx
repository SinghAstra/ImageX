import { getFolders } from "@/actions/folder";
import { FolderContent } from "@/components/dashboard/folder-content";

export default async function DashboardFolderPage({
  params,
}: {
  params: Promise<{ folderId: string }>;
}) {
  const { folderId } = await params;
  const folders = await getFolders(folderId);

  return <FolderContent folders={folders || []} currentFolderId={folderId} />;
}
