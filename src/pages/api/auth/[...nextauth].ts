import NextAuth, { Account, Session, TokenSet } from "next-auth"
import { AdapterUser } from "next-auth/adapters"
import CredentialsProvider from "next-auth/providers/credentials"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        const res = await fetch(`${baseUrl}/user/login`, {
          method: 'POST',
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password
          }),
          headers: { "Content-Type": "application/json" }
        })
        const user = await res.json();

        // If no error and we have user data, return it
        if (res.ok && user) {
          return {
            id: user.user.id as string,
            name: user.user.fullName,
            email: user.user.email,
            phoneNumber: user.user.phoneNumber,
            role: user.user.perfis.descricao,
            token: user.token
          }
        }
        // Return null if user data could not be retrieved
        return null;
      },
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async jwt({ token, user, account } : any) {

      if (account && user) {
        return {
          ...token,
          id: account.providerAccountId,
          accessToken: user.token,
          role: user.role
        };
      }

      return token;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, token }: {
      session: Session;
      token: TokenSet;
    }) {
      session.user.accessToken = token.accessToken as string;
      session.user.id = token.id as string;
      session.user.role = token.role as string;

      return session;
    }
  },

}

export default NextAuth(authOptions)
