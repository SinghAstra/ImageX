import { getFolders } from "@/actions/folder";
import { DashboardContent } from "./dashboard-content";

export default async function DashboardRootPage() {
  const folders = await getFolders(null);

  return <DashboardContent folders={folders || []} currentFolderId={null} />;
}
