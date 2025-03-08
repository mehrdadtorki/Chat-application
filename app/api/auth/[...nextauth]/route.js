// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import pool from "@/lib/db";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          console.log(
            `Authentication attempt for user: ${credentials.username}`
          );

          const user = await pool.query(
            "SELECT id, username, password_hash FROM users WHERE username = $1",
            [credentials.username]
          );

          if (user.rows.length === 0) {
            console.error(`User not found: ${credentials.username}`);
            throw new Error("User not found");
          }

          const isValid = await bcrypt.compare(
            credentials.password,
            user.rows[0].password_hash
          );

          if (!isValid) {
            console.error(`Invalid password for user: ${credentials.username}`);
            throw new Error("Invalid password");
          }

          console.log(`User authenticated: ${credentials.username}`);
          return { id: user.rows[0].id, username: user.rows[0].username };
        } catch (error) {
          console.error("Authentication error:", error.message);
          throw new Error(error.message);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.username = token.username;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    maxAge: 24 * 60 * 60, // 24 hours
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
