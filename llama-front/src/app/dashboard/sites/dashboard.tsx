"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SitesData, Site } from "./types";
import NewSiteCard from "@/components/dashboard/NewSiteCard";
import ExistingSiteCard from "@/components/dashboard/ExistingSiteCard";
import CONSTANTS from "@/constants";
import Modal from "@/components/dashboard/Modal";
import { deleteSite } from "@/app/dashboard/sites/actions";
import { toast } from "react-toastify";

type PageProps = {
  sites: SitesData;
  accessToken: string | undefined;
};

export default function Dashboard({ sites, accessToken }: PageProps) {
  const router = useRouter();

  const [siteToDelete, setSiteToDelete] = useState<Site | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    const result = await deleteSite(id);
    if (!result) {
      setIsLoading(false);
      toast.error("Não foi possível excluir o site. Tente novamente!");
      return null;
    }
    toast.success("Sucesso!");
    toggleDeleteModal(null);
    setIsLoading(false);
  };

  const onDownloadSite = async (id: string) => {
    setIsLoading(true);
    const site = sites.find(s => s.id === id);

    if (!site) {
      setIsLoading(false);
      return null;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/site/${id}/download`,
      {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/octet-stream",
        },
        next: { tags: [CONSTANTS.DOWNLOAD_SITE] },
      }
    );

    if (response.status !== 200) {
      setIsLoading(false);
      toast.error("Não foi possível baixar o arquivo. Tente novamente!");
      return null;
    }

    console.log("response", response);
    const blob = await response.blob();

    const data = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = data;
    link.download = `${site.name}.html`;

    // this is necessary as link.click() does not work on the latest firefox
    link.dispatchEvent(
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      })
    );

    setTimeout(() => {
      // For Firefox it is necessary to delay revoking the ObjectURL
      window.URL.revokeObjectURL(data);
      link.remove();
    }, 100);

    toast.success("Sucesso!");
    setIsLoading(false);
  };

  const toggleDeleteModal = (site: Site | null) => setSiteToDelete(site);

  return (
    <section className="w-full flex flex-row flex-wrap gap-3 justify-center items-center">
      {siteToDelete ? (
        <Modal>
          <p>
            Tem certeza que deseja excluir o site{" "}
            <span className="font-semibold">{siteToDelete.name}</span> ?
          </p>

          <div className="flex flex-wrap justify-center gap-5 mt-5 md:mt-10">
            <button
              className="bg-white hover:bg-red-500 transition-all duration-500 text-black disabled:text-gray-500 font-semibold text-md p-3 px-8 rounded-md mt-auto "
              type="button"
              onClick={() => toggleDeleteModal(null)}
              disabled={isLoading}
            >
              Cancelar
            </button>
            <button
              className="bg-primary hover:bg-primary_hover text-black disabled:bg-gray-100 disabled:text-gray-500  font-semibold text-md p-3 px-8 rounded-md mt-auto "
              type="button"
              onClick={() => onDeleteSite(siteToDelete.id)}
              disabled={isLoading}
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
                siteStep={site.step}
                onEdit={() => openSite(site.id)}
                onDelete={() => toggleDeleteModal(site)}
                onDownload={() => onDownloadSite(site.id)}
                isLoading={isLoading}
              />
            </div>
          ))
        : null}
      {!siteToDelete ? <NewSiteCard onClick={addNewSite} /> : null}
    </section>
  );
}
