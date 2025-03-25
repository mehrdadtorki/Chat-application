import pool from "@/lib/db"; // Adjust path based on your structure

export async function POST(request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const query = `
      INSERT INTO feedback (name, email, message)
      VALUES ($1, $2, $3)
      RETURNING id, created_at;
    `;
    const values = [name, email, message];
    const result = await pool.query(query, values);

    return new Response(
      JSON.stringify({
        success: true,
        data: { id: result.rows[0].id, created_at: result.rows[0].created_at },
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error saving feedback:", error);
    return new Response(JSON.stringify({ error: "Failed to save feedback" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
