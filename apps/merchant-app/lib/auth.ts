import type { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import db from "@repo/db/client";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (!user?.email || !account?.provider) {
        return false;
      }

      if (account.provider !== "google" && account.provider !== "github") {
        return false;
      }

      const authType = account.provider === "google" ? "Google" : "Github";
      const merchantName = user.name ?? undefined;

      await db.merchant.upsert({
        select: {
          id: true,
        },
        where: {
          email: user.email,
        },
        create: {
          email: user.email,
          auth_type: authType,
          ...(merchantName ? { name: merchantName } : {}),
        },
        update: {
          auth_type: authType,
          ...(merchantName ? { name: merchantName } : {}),
        },
      });

      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "secret",
};
