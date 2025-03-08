import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import pool from "@/lib/db";

export async function POST(request) {
  const { username, password } = await request.json();

  try {
    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Save the user to the database
    const result = await pool.query(
      "INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING id",
      [username, passwordHash]
    );

    return NextResponse.json({ success: true, userId: result.rows[0].id });
  } catch (error) {
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "User already exists with this username" },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
