import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";

const admins = ["andreasprager08@gmail.com"];

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
    async signIn({ user }) {
      await connectToDatabase();
      const existingUser = await User.findOne({ email: user.email });

      if (!existingUser) {
        await User.create({
          email: user.email,
          name: user.name,
          image: user.image,
          gold: 1000,
          material: 0,
          collectedCards: [
            {
              cardId: "67cc25c647517f81dd41a4f0",
              quantity: 3,
            },
            {
              cardId: "67cc25ff47517f81dd41a4f3",
              quantity: 3,
            },
            {
              cardId: "67cc263047517f81dd41a4f6",
              quantity: 3,
            },
            {
              cardId: "67cc267347517f81dd41a4f9",
              quantity: 3,
            },
            {
              cardId: "67cc269f47517f81dd41a4fb",
              quantity: 3,
            },
            {
              cardId: "67cc270947517f81dd41a4fe",
              quantity: 3,
            },
            {
              cardId: "67cc275047517f81dd41a501",
              quantity: 3,
            },
            {
              cardId: "67cc27c447517f81dd41a504",
              quantity: 3,
            },
            {
              cardId: "67cc27f147517f81dd41a507",
              quantity: 3,
            },
            {
              cardId: "67cc2a7d47517f81dd41a50f",
              quantity: 3,
            },
          ],
          decks: [
            {
              name: "Starter Deck",
              cards: [
                {
                  cardId: "67cc25c647517f81dd41a4f0",
                  quantity: 3,
                },
                {
                  cardId: "67cc25ff47517f81dd41a4f3",
                  quantity: 3,
                },
                {
                  cardId: "67cc263047517f81dd41a4f6",
                  quantity: 3,
                },
                {
                  cardId: "67cc267347517f81dd41a4f9",
                  quantity: 3,
                },
                {
                  cardId: "67cc269f47517f81dd41a4fb",
                  quantity: 3,
                },
                {
                  cardId: "67cc270947517f81dd41a4fe",
                  quantity: 3,
                },
                {
                  cardId: "67cc275047517f81dd41a501",
                  quantity: 3,
                },
                {
                  cardId: "67cc27c447517f81dd41a504",
                  quantity: 3,
                },
                {
                  cardId: "67cc27f147517f81dd41a507",
                  quantity: 3,
                },
                {
                  cardId: "67cc2a7d47517f81dd41a50f",
                  quantity: 3,
                },
              ],
            },
          ],
        });
      }

      return true;
    },
    async session({ session, token }) {
      session.user.email = token.email;
      session.user.isAdmin = admins.includes(session.user.email);
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
