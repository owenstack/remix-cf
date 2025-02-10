import { auth } from "~/utils/auth.server";
import { Form } from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import { user } from "~/db/schema";
import { authClient } from "~/utils/auth.client";

export async function loader({ request, context }: LoaderFunctionArgs) {

	const db = drizzle(context.cloudflare.env.DATABASE);

	const userCount = await db
		.select({
			count: sql<number>`count(*)`.mapWith(Number),
		})
		.from(user);

	return { userCount: userCount[0].count };
}

export default function Index() {

  const signUp = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/"
    })
  }

	return (
		<main className="flex min-h-screen flex-col items-center justify-center">
			<div className="flex w-full max-w-2xl justify-between">
				<div className="flex items-center justify-center gap-2">
					<span className="italic">Cloudflare Remix SaaS Starter</span>
				</div>

				<div className="flex items-center rounded-2xl border border-black p-2 dark:border-white">
					Start by editing app/routes/_index.tsx
				</div>
			</div>

			<div className="mt-16 w-full max-w-2xl text-start">
				Welcome to Cloudflare Remix SaaS Starter. <br /> 
				Build a full stack app using production-ready tools and frameworks, host on Cloudflare instantly.
				<br />
				An opinionated, batteries-included framework. Fully Typesafe. Best practices followed by default.
				<br /> <br />
				Here&apos;s what the stack includes:
				<ul className="mt-4 list-disc prose dark:prose-invert">
					<li>Authentication with <code>better-auth</code></li>
					<li>Database using Cloudflare&apos;s D1 serverless databases</li>
					<li>Drizzle ORM, already connected to your database and auth ⚡</li>
					<li>Light/darkmode theming</li>
					<li>Styling using TailwindCSS</li>
					<li>Cloudflare wrangler for quick functions on the edge</li>
					<li>... best part: everything&apos;s already set up for you. Just code!</li>
				</ul>

				<Form onSubmit={signUp}>
					<button 
						type="submit"
						className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
					>
						Sign Up
					</button>
				</Form>
			</div>
		</main>
	);
}
