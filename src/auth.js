import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "@/lib/db";
import users from "@/models/user";
import { authConfig } from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;

        await connectToDatabase();
        console.log("Connected to MongoDB");
        
        const user = await users.findOne({ email: email });
        if (!user) {
          console.log("User not found");
          
          throw new Error("User not found");
        }

        //is user verified
        if (!user.isVerified) {
          console.log("User not verified");

          throw new Error("User is not verified");
        }

        // const isPasswordCorrect = await user.comparePassword(password);
        if (user.password !== password) {
          console.log("Password incorrect");

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
          token.image = userExists.image;
        }
      }
      return token;
    },
    async session({ session, token }) {
      // Pass custom fields from the token to the session object
      session.user._id = token._id;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.image = token.image;
      return session;
    },
  },
});
