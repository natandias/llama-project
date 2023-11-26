"use client";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";

export default withPageAuthRequired(function SiteDescription() {
  return (
    <section className="flex">
      <h1>Site description</h1>
    </section>
  );
});
