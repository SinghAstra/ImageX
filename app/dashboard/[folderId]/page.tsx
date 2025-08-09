import { getFolders } from "@/actions/folder";
import { getImagesInFolder } from "@/actions/image";
import { FolderContent } from "@/components/dashboard/folder-content";

export default async function DashboardFolderPage({
  params,
}: {
  params: Promise<{ folderId: string }>;
}) {
  const { folderId } = await params;
  const folders = await getFolders(folderId);
  const images = await getImagesInFolder(folderId);

  return (
    <FolderContent
      folders={folders || []}
      images={images || []}
      currentFolderId={folderId}
    />
  );
}
