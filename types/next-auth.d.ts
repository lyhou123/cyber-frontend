import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string; // Add the accessToken to the session type
  }

  interface JWT {
    accessToken?: string; // Add the accessToken to the JWT type
  }
}
