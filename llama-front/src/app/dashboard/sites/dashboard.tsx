"use client";
import { useRouter } from "next/navigation";
import { SitesData } from "./types";
import NewSiteCard from "@/components/dashboard/NewSiteCard";
import ExistingSiteCard from "@/components/dashboard/ExistingSiteCard";

type PageProps = {
  sites: SitesData;
};

export default function Dashboard({ sites }: PageProps) {
  const router = useRouter();

  const addNewSite = () => router.push("/dashboard/sites/new");
  const openSite = (id: string) =>
    router.push(`/dashboard/sites/new/${id}/description`);

  return (
    <section className="w-full flex flex-row flex-wrap gap-3 justify-center items-center">
      <NewSiteCard onClick={addNewSite} />
      {sites &&
        sites.map(site => (
          <div key={site.id}>
            <ExistingSiteCard
              title={site.name}
              onClick={() => openSite(site.id)}
            />
          </div>
        ))}
    </section>
  );
}
