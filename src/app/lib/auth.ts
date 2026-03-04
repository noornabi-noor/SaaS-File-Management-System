import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { envVars } from "../config/env";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  trustedOrigins: [envVars.APP_URL!,
  "http://localhost:3000",
  "http://localhost:5173"
  ],

  session: {
    cookieCache: {
      // secure: true,
      secure: false,
      enabled: true,
      maxAge: 5 * 60, // 5 minutes
      sameSite: "lax",
      // sameSite: "none",
      httpOnly: true,
      path: "/",
    },
  },
  advanced: {
    cookiePrefix: "better-auth",
    useSecureCookies: process.env.NODE_ENV === "production",
    // useSecureCookies: true,
    crossSubDomainCookies: {
      enabled: false,
    },
    // disableCSRFCheck: true,
  },

  emailAndPassword: {
    enabled: true,
  },

});
