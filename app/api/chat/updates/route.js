import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const room = searchParams.get("room");

  const responseStream = new TransformStream();
  const writer = responseStream.writable.getWriter();

  // Fetch new messages every 2 seconds
  const interval = setInterval(async () => {
    const messages = await pool.query(
      `SELECT username, text, timestamp
       FROM messages
       JOIN users ON messages.user_id = users.id
       WHERE room_id = (SELECT id FROM rooms WHERE name = $1)
       ORDER BY timestamp DESC
       LIMIT 1`,
      [room]
    );

    if (messages.rows.length > 0) {
      writer.write(`data: ${JSON.stringify(messages.rows[0])}\n\n`);
    }
  }, 2000);

  // Cleanup on client disconnect
  request.signal.onabort = () => {
    clearInterval(interval);
    writer.close();
  };

  return new NextResponse(responseStream.readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
