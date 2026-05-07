import { getDB } from "@/lib/db";
import CatalogContent from "./CatalogContent";

export default function CatalogPage() {
  const db = getDB();
  
  return (
    <div className="min-h-screen bg-background">
      <CatalogContent initialProducts={db.inventory} />
    </div>
  );
}
