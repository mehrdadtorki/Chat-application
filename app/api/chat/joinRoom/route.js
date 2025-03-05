// app/api/chat/joinRoom/route.js
import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(request) {
  const { username, room } = await request.json();

  try {
    // Check if user exists, otherwise create
    const user = await pool.query(
      "INSERT INTO users (username) VALUES ($1) ON CONFLICT (username) DO NOTHING RETURNING id",
      [username]
    );

    // Check if room exists, otherwise create
    const roomData = await pool.query(
      "INSERT INTO rooms (name) VALUES ($1) ON CONFLICT (name) DO NOTHING RETURNING id",
      [room]
    );

    // Fetch message history
    const messages = await pool.query(
      `SELECT username, text, timestamp
       FROM messages
       JOIN users ON messages.user_id = users.id
       WHERE room_id = (SELECT id FROM rooms WHERE name = $1)
       ORDER BY timestamp ASC`,
      [room]
    );

    return NextResponse.json({ messages: messages.rows });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
