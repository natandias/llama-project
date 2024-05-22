"use client";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { Site } from "@/app/dashboard/sites/types";

type Props = {
  siteInfo: Site;
};

export default withPageAuthRequired(function ViewSitePage({ siteInfo }: Props) {
  return <h1>View you new website</h1>;
});
