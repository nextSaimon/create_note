import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "@/lib/db";
import users from "@/models/user";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  page: {
    signIn: "/signin",
    signUp: "/signup",
    error: "/signin",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;
        await connectToDatabase();

        const user = await users.findOne({ email: email });
        if (!user) {
          throw new Error("User not found");
        }

        //is user verified
        if (!user.isVerified) {
          throw new Error("User is not verified");
        }

        const isPasswordCorrect = await user.comparePassword(password);
        if (!isPasswordCorrect) {
          throw new Error("Incorrect password");
        }
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const email = user.email;
        const userExists = await users.findOne({ email });
        if (userExists) {
          token._id = userExists._id;
          token.name = user.name;
          token.email = user.email;
        }
      }
      return token;
    },
    async session({ session, token }) {
      // Pass custom fields from the token to the session object
      session.user._id = token._id;
      session.user.name = token.name;
      session.user.email = token.email;
      return session;
    },
  },
});
