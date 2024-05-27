"use client";
import { useRouter } from "next/navigation";
import { SitesData, Site } from "./types";
import NewSiteCard from "@/components/dashboard/NewSiteCard";
import ExistingSiteCard from "@/components/dashboard/ExistingSiteCard";
import CONSTANTS from "@/constants";
import { useState } from "react";
import Modal from "@/components/dashboard/Modal";
import { deleteSite } from "@/app/dashboard/sites/actions";
import Loading from "@/components/dashboard/Loading";

type PageProps = {
  sites: SitesData;
};

export default function Dashboard({ sites }: PageProps) {
  const router = useRouter();

  const [siteToDelete, setSiteToDelete] = useState<Site | null>(null);
  const [isDeletingSite, setIsDeletingSite] = useState(false);

  const addNewSite = () => router.push("/dashboard/sites/new");
  const openSite = (id: string) => {
    const site = sites.find(s => s.id === id);
    if (site) {
      if (site.step === CONSTANTS.SITE_STEPS.CHATTING)
        router.push(`/dashboard/sites/new/${id}/description`);
      if (
        site.step === CONSTANTS.SITE_STEPS.EDITING_REQUIREMENTS ||
        site.step === CONSTANTS.SITE_STEPS.DONE
      )
        router.push(`/dashboard/sites/new/${id}/requirements`);
    }
  };

  const onDeleteSite = async (id: string) => {
    setIsDeletingSite(true);
    await deleteSite(id);
    toggleDeleteModal(null);
    setIsDeletingSite(false);
  };

  const toggleDeleteModal = (site: Site | null) => setSiteToDelete(site);

  return isDeletingSite ? (
    <Loading />
  ) : (
    <section className="w-full flex flex-row flex-wrap gap-3 justify-center items-center">
      {siteToDelete ? (
        <Modal>
          <p>
            Tem certeza que deseja excluir o site{" "}
            <span className="font-semibold">{siteToDelete.name}</span> ?
          </p>

          <div className="flex flex-wrap justify-center gap-5 mt-5 md:mt-10">
            <button
              className="bg-white hover:bg-red-500 transition-all duration-500 text-black font-semibold text-md p-3 px-8 rounded-md mt-auto "
              type="button"
              onClick={() => toggleDeleteModal(null)}
            >
              Cancelar
            </button>
            <button
              className="bg-primary hover:bg-primary_hover text-black font-semibold text-md p-3 px-8 rounded-md mt-auto "
              type="button"
              onClick={() => onDeleteSite(siteToDelete.id)}
              disabled={isDeletingSite}
            >
              Confirmar
            </button>
          </div>
        </Modal>
      ) : null}
      {!siteToDelete
        ? sites &&
          sites.map(site => (
            <div key={site.id}>
              <ExistingSiteCard
                id={site.id}
                name={site.name}
                onEdit={() => openSite(site.id)}
                onDelete={() => toggleDeleteModal(site)}
                siteStep={site.step}
              />
            </div>
          ))
        : null}
      {!siteToDelete ? <NewSiteCard onClick={addNewSite} /> : null}
    </section>
  );
}
