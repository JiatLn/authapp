import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from 'next-auth/providers/credentials'
import { AuthOptions, Session } from "next-auth"
import { connectMongo } from "@/lib/conn"
import { User } from "@/models/user"
import { compareSync } from 'bcrypt'

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {}
      },
      async authorize(credentials, req) {
        if (!credentials) {
          throw new Error('Credentials not found')
        }

        const isConnect = await connectMongo()
        if (!isConnect) {
          throw new Error('Internal Server Error')
        }

        const { email, password } = credentials

        const user = await User.findOne({ email })

        if (!user) {
          throw new Error('Email or password is incorrect')
        }

        const isPasswordMatch = compareSync(password, user?.password)

        if (!isPasswordMatch) {
          throw new Error('Email or password is incorrect')
        }

        return user
      },
    })
    // ...add more providers here
  ],
  callbacks: {
    async session({ session }) {

      const email = session.user?.email

      if (email) {
        const dbUser = await User.findOne({ email })
        session.user = {
          ...session.user,
          ...dbUser._doc,
        }
      }

      return session
    },
  },
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.AUTH_SECRET
}
