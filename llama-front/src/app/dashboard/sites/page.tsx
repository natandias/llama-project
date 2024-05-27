import { getAccessToken, withPageAuthRequired } from "@auth0/nextjs-auth0";
import CONSTANTS from "@/constants";
import { GetSitesReqReturnValue, SitesData } from "./types";
import Dashboard from "./dashboard";

type GetSites = () => Promise<GetSitesReqReturnValue | null>;


const getSites: GetSites = async () => {
  const { accessToken } = await getAccessToken({
    refresh: false,
  });

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/site/list`, {
    method: "GET",
    headers: { Authorization: `Bearer ${accessToken}` },
    next: { tags: [CONSTANTS.GET_SITES] },
  });

  if (res.status === 200) {
    const sites: GetSitesReqReturnValue = await res.json();
    return sites;
  }
  return null;
};

export default withPageAuthRequired(
  async function Page() {
    // Fetch data directly in a Server Component
    const result = await getSites();
    let sites: SitesData = [];
    if (result?.success && result.data) {
      const { data: sitesData } = result;
      sites = sitesData;
    }

    const { accessToken } = await getAccessToken({
      refresh: false,
    });

    // Forward fetched data to your Client Component
    return <Dashboard sites={sites} accessToken={accessToken} />;
  },
  { returnTo: "/" }
);
