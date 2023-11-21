"use client";

import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";

export default withPageAuthRequired(function Dashboard() {
  return <section className="flex flex-col min-w-1/4 mt-10">Dashboard</section>;
});
