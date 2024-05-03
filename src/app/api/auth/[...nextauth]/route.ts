import NextAuth from 'next-auth';
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
  providers: [
    FacebookProvider({
      clientId: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        token.accessToken = account.access_token;
        token.provicder = account.provicder;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.provider = token.provider as string;
      return session;
    },
    async signIn({ user, account, profile, email, credentials }) {
      console.log('profile', profile);
      return true;
    },
  },
});

export { handler as GET, handler as POST };
