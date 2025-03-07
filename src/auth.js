import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const admins = ["andreasprager08@gmail.com"]; // Replace with the email(s) of your admin users

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_CLIENT_ID,
      clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      session.user.email = token.email;
      // Add admin role to the session if the user is an admin
      session.user.isAdmin = admins.includes(session.user.email);
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
