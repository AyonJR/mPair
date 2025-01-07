import { connectDb } from "@/lib/connectDb";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      credentials: {
        empId: {},
        password: {},
      },
      async authorize(credentials) {
        const { empId, password } = credentials;
        if (!empId || !password) {
          return null;
        }
        const db = await connectDb();
        const currentUser = await db.collection("user").findOne({ empId });
        if (!currentUser) {
          return null;
        }
        if (password !== currentUser.password) {
          return null;
        }

        return currentUser;
      },
    }),
  ],
  callbacks: {},
  pages: {
    signIn: "/",
  },
});

export { handler as GET, handler as POST };
