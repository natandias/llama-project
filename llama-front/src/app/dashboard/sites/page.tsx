"use client";
import { useRouter } from "next/navigation";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { PlusOutlined } from "@ant-design/icons";

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

export default withPageAuthRequired(function Dashboard() {
  const router = useRouter();

  const addNewSite = () => router.push("/dashboard/sites/new");
  const openSite = (id: string) => {};

  return (
    <section className="w-full flex flex-row flex-wrap gap-5 justify-center items-center">
      <NewSiteCard onClick={addNewSite} />
      <ExistingSiteCard title="My Website" onClick={() => openSite("1234")} />
    </section>
  );
});
