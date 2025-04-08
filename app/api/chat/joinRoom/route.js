// app/api/chat/joiningroom/route.js
import pool from "@/lib/db";

export async function POST(req) {
  const { user1_id, user2_id } = await req.json();

  const roomName = [user1_id, user2_id].sort().join("_");

  try {
    const client = await pool.connect();

    // Check if room exists
    const existing = await client.query(
      "SELECT id FROM rooms WHERE name = $1",
      [roomName]
    );

    let roomId;
    if (existing.rows.length > 0) {
      roomId = existing.rows[0].id;
    } else {
      // Create new room
      const result = await client.query(
        "INSERT INTO rooms (name) VALUES ($1) RETURNING id",
        [roomName]
      );
      roomId = result.rows[0].id;
    }

    client.release();
    return new Response(JSON.stringify({ roomId }), { status: 200 });
  } catch (err) {
    console.error("Join room error:", err);
    return new Response(
      JSON.stringify({ error: "Failed to join or create room" }),
      { status: 500 }
    );
  }
}
