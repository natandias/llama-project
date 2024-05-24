"use client";
import { useRouter } from "next/navigation";
import { SitesData } from "./types";
import NewSiteCard from "@/components/dashboard/NewSiteCard";
import ExistingSiteCard from "@/components/dashboard/ExistingSiteCard";
import CONSTANTS from "@/constants";

type PageProps = {
  sites: SitesData;
};

export default function Dashboard({ sites }: PageProps) {
  const router = useRouter();

  const addNewSite = () => router.push("/dashboard/sites/new");
  const openSite = (id: string) => {
    const site = sites.find(s => s.id === id);
    if (site) {
      if (site.step === CONSTANTS.SITE_STEPS.CHATTING)
        router.push(`/dashboard/sites/new/${id}/description`);
      if (
        site.step === CONSTANTS.SITE_STEPS.EDITTING_REQUIREMENTS ||
        site.step === CONSTANTS.SITE_STEPS.DONE
      )
        router.push(`/dashboard/sites/new/${id}/requirements`);
    }
  };

  return (
    <section className="w-full flex flex-row flex-wrap gap-3 justify-center items-center">
      {sites &&
        sites.map(site => (
          <div key={site.id}>
            <ExistingSiteCard
              id={site.id}
              name={site.name}
              onEdit={() => openSite(site.id)}
              siteStep={site.step}
            />
          </div>
        ))}
      <NewSiteCard onClick={addNewSite} />
    </section>
  );
}
