import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    fullName: string;
    phone: string;
  }

  interface Session {
    user: {
      id: string;
      fullName: string;
      email: string;
      phone: string;
    } & DefaultSession["user"];
  }

  interface JWT {
    id: string;
    fullName: string;
    email: string;
    phone: string;
  }
}