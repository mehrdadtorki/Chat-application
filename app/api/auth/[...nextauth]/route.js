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

          const userQuery = await pool.query(
            `SELECT id, username, password_hash, profile, biography 
             FROM users WHERE username = $1`,
            [credentials.username]
          );

          if (userQuery.rows.length === 0) {
            console.error(`User not found: ${credentials.username}`);
            throw new Error("User not found");
          }

          const user = userQuery.rows[0];

          const isValid = await bcrypt.compare(
            credentials.password,
            user.password_hash
          );

          if (!isValid) {
            console.error(`Invalid password for user: ${credentials.username}`);
            throw new Error("Invalid password");
          }

          console.log(`User authenticated: ${credentials.username}`);

          // Convert profile and header_image to base64 strings if present
          const profileUrl = user.profile
            ? Buffer.from(user.profile).toString("utf8")
            : null;

          return {
            id: user.id,
            username: user.username,
            profile: profileUrl, // Converted to base64 string
            biography: user.biography,
          };
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
        token.profile = user.profile;
        token.biography = user.biography;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.username = token.username;
      session.user.profile = token.profile;
      session.user.biography = token.biography;
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
