"use client";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";

export default withPageAuthRequired(function Site() {
  return (
    <section className="flex">
      <h1>Site page</h1>
    </section>
  );
});
