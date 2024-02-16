"use client";
import { useRouter } from "next/navigation";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

type NewSiteCardProps = {
  onClick: () => void;
};

type ExistingSiteCardProps = { title: string; onClick: () => void };

const NewSiteCard = ({ onClick }: NewSiteCardProps) => (
  <button
    className="flex flex-col gap-6 w-80 h-52 bg-white border border-black rounded-md p-6 items-center justify-center"
    onClick={onClick}
  >
    <PlusOutlined className="text-2xl" />
  </button>
);

const ExistingSiteCard = ({ title, onClick }: ExistingSiteCardProps) => (
  <button
    className="flex flex-col gap-6 w-80 h-52 bg-primary text-black border border-black rounded-md items-center justify-center"
    onClick={onClick}
  >
    {title}
  </button>
);

type SitesData = {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
}[];

export default withPageAuthRequired(function Dashboard() {
  const router = useRouter();
  const [sites, setSites] = useState<SitesData>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("/api/site", {
      method: "GET",
    })
      .then(async response => {
        const responseData = await response.json();
        console.log("responseData", responseData);
        setSites(responseData);
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
        console.error(`/api/sites/ error`, error);
      });
  }, []);

  const addNewSite = () => router.push("/dashboard/sites/new");
  const openSite = (id: string) =>
    router.push(`/dashboard/sites/new/${id}/description`);

  return (
    <section className="w-full flex flex-row flex-wrap gap-5 justify-center items-center">
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
});
