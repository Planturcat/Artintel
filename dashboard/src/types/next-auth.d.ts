import 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    tier?: string;
    role?: string;
    organization?: string;
  }

  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      tier?: string;
      role?: string;
      organization?: string | null;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    tier?: string;
    role?: string;
    organization?: string | null;
  }
} 