import { createAuthClient } from "better-auth/react"; // make sure to import from better-auth/react
import type { SocialProvider } from "better-auth/social-providers";

export const authClient = createAuthClient({});

export const signIn = async (provider: SocialProvider) =>
	await authClient.signIn.social({ provider });
