import NextAuth from 'next-auth';
import { AuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import AppleProvider from 'next-auth/providers/apple';
import CredentialsProvider from 'next-auth/providers/credentials';
import { authAPI } from '@/lib/api';

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    AppleProvider({
      clientId: process.env.APPLE_ID || '',
      clientSecret: process.env.APPLE_SECRET || '',
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error('Username and password are required');
        }
        
        try {
          // Call the mock auth API for login
          const result = await authAPI.login({
            username: credentials.username,
            password: credentials.password
          });
          
          // Get user data using the token
          const userData = await authAPI.me();
          
          // Check if user is verified
          if (!userData.is_verified) {
            throw new Error('Email not verified. Please verify your email before logging in.');
          }
          
          // Return user data in the format expected by NextAuth
          return {
            id: userData.user_id,
            name: userData.full_name,
            email: userData.email,
            image: null,
            tier: userData.tier,
            role: userData.role,
            organization: userData.organization
          };
        } catch (error: any) {
          // Handle login errors
          throw new Error(error.message || 'Authentication failed');
        }
      }
    }),
  ],
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.tier = token.tier as string;
        session.user.role = token.role as string;
        session.user.organization = token.organization as string || null;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.tier = user.tier;
        token.role = user.role;
        token.organization = user.organization;
      }
      return token;
    },
  },
  session: {
    strategy: 'jwt',
  },
  debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; 