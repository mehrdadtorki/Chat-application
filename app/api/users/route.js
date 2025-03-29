import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(req) {
  try {
    const headers = Object.fromEntries(req.headers);
    const userId = Number(headers["user-id"]);

    const response = await pool.query("SELECT * FROM users");
    console.log(userId);
    const usersArray = response.rows.map(
      ({ password_hash, profile, date_of_join, ...rest }) => {
        // Handle profile as a Buffer or null
        const profileUrl = profile
          ? Buffer.from(profile).toString("utf8")
          : null;
        const joined = date_of_join;
        return { ...rest, joined, profile: profileUrl };
      }
    );

    const users = usersArray.filter((user) => user?.id !== userId);

    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
