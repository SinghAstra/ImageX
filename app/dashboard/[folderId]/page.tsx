import { getFolders } from "@/actions/folder";
import { DashboardContent } from "./dashboard-content";

export default async function DashboardFolderPage({
  params,
}: {
  params: Promise<{ folderId: string }>;
}) {
  const { folderId } = await params;
  console.log("folderId is ", folderId);
  const folders = await getFolders(folderId);

  return (
    <DashboardContent folders={folders || []} currentFolderId={folderId} />
  );
}
