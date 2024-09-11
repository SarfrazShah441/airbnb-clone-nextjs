import NextAuth, { AuthOptions } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/app/libs/prismadb';
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import CredentialProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt';

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialProvider({
          name: 'credentials',
          credentials: {
              email: { label: 'email', type: 'text' },
              password: { label: 'password', type: 'password' },
          },
          async authorize(credentials) {
              if (!credentials?.email || !credentials?.password) {
                  throw new Error('Invalid credentials');
              }

              const user = await prisma.user.findUnique({
                  where: {
                      email: credentials.email
                  }
              });

              if (!user || !user?.hashPassword) {
                  throw new Error('Invalid credentials');
              }

              const isCorrectPassword = bcrypt.compare(
                  credentials.password,
                  user.hashPassword
              )

              if (!isCorrectPassword) {
                  throw new Error('Invalid credentials');
              }

              return user;


          }
    })
    ],
    pages: {
      signIn: '/',
    },
    debug: process.env.NODE_ENV === "development",
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
};


export default NextAuth(authOptions);