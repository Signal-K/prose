import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
    newUser: '/',
  },
  providers: [
    // added later in auth.ts since it requires bcrypt which is only compatible with Node.js
    // while this file is also used in non-Node.js environments
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnApplication = nextUrl.pathname.startsWith('/application');
      const isOnRegister = nextUrl.pathname.startsWith('/register');
      const isOnLogin = nextUrl.pathname.startsWith('/login');

      // If the user is logged in and tries to access login/register, redirect to application
      if ((isOnLogin || isOnRegister) && isLoggedIn) {
        return Response.redirect(new URL('/application', nextUrl));
      }

      // Always allow access to login and register pages for non-logged in users
      if (isOnLogin || isOnRegister) {
        return true;
      }

      // Protect application routes
      if (isOnApplication) {
        return isLoggedIn;
      }

      // Allow access to all other routes
      return true;
    },
  },
} satisfies NextAuthConfig;
