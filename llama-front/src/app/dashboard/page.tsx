"use client";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { PlusOutlined } from "@ant-design/icons";

const NewSiteCard = () => (
  <button className="flex flex-col gap-6 w-80 h-52 bg-white border border-black rounded-md p-6 items-center justify-center">
    <PlusOutlined className="text-2xl" />
  </button>
);

const ExistingCard = () => (
  <button className="flex flex-col gap-6 w-80 h-52 bg-primary text-black border border-black rounded-md items-center justify-center">
    My Website
  </button>
);

export default withPageAuthRequired(function Dashboard() {
  return (
    <section className="w-full flex flex-row flex-wrap gap-5 justify-center items-center">
      <NewSiteCard />
      <ExistingCard />
    </section>
  );
});
