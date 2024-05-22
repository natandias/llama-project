import { AppRouterPageRoute, withPageAuthRequired } from "@auth0/nextjs-auth0";
import CONSTANTS from "@/constants";
import ViewSitePage from "./viewSitePage";
import { getSite } from "@/app/dashboard/sites/actions";

type PageProps = {
  params: {
    site: string;
  };
};

export default withPageAuthRequired(
  async function Page(props: PageProps) {
    const { site } = props.params;
    const result = await getSite(site);
    let siteInfo = null;
    if (result?.success && result.data) {
      const { data } = result;
      siteInfo = data;
    }

    // Forward fetched data to your Client Component
    return <ViewSitePage siteInfo={siteInfo} />;
  } as AppRouterPageRoute,
  { returnTo: "/" }
);
