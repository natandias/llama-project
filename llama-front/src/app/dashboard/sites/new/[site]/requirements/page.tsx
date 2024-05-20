import { AppRouterPageRoute, withPageAuthRequired } from "@auth0/nextjs-auth0";
import CONSTANTS from "@/constants";
import RequirementsPage from "./requirementsPage";
import { getSite } from "@/app/dashboard/sites/actions";

type PageProps = {
  params: {
    site: string;
  };
};

export default withPageAuthRequired(
  async function Page(props: PageProps) {
    // Fetch data directly in a Server Component\
    const { site } = props.params;
    const result = await getSite(site);
    let siteInfo = null;
    if (result?.success && result.data) {
      const { data } = result;
      siteInfo = data;
    }

    // Forward fetched data to your Client Component
    return <RequirementsPage siteInfo={siteInfo} />;
  } as AppRouterPageRoute,
  { returnTo: "/" }
);
