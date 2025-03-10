import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const response = await pool.query("SELECT * FROM users");
    const users = response.rows.map(({ password_hash, profile, ...rest }) => {
      // Handle profile as a Buffer or null
      const profileUrl = profile ? Buffer.from(profile).toString("utf8") : null;
      return { ...rest, profile: profileUrl };
    });

    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
