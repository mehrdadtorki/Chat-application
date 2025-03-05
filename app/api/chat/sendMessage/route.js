// app/api/chat/sendMessage/route.js
import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(request) {
  const { username, room, text } = await request.json();

  try {
    // Save message to database
    await pool.query(
      `INSERT INTO messages (user_id, room_id, text)
       VALUES ((SELECT id FROM users WHERE username = $1), (SELECT id FROM rooms WHERE name = $2), $3)`,
      [username, room, text]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
